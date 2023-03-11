import settings from "../config";
import * as eoe from "empire-of-evil"
import { randomInt } from "empire-of-evil/src/utilities";
import { buildingsSchematics } from "empire-of-evil/src/buildings";
import {toDataArray} from "../utilities/dataHelpers"
import { generateAgentData, generatePerson } from "empire-of-evil/src/generators/game";
import { getControlledZones, hireAgent } from "empire-of-evil/src/organization";
import { getZoneCitizens } from "empire-of-evil/src/zones";
const { Shufflebag } = require("../utilities/shufflebag");
const buildingShufflebag = Shufflebag({
  bank: 1,
  apartment: 1,
  laboratory: 1
});
const recruitDepartmentShufflebag = Shufflebag({
  0: 5,
  1: 3,
  2: 1
});
// const eoe = require("empire-of-evil");

/**
 * Sets up a new EOE game, spawning Nations, Orgs,
 * Zones, and People, including the EVIL Empire.
 * @returns {import("empire-of-evil/src/typedef").GameData} An object containing game data
 */
export const handleNewGame = () => {
  // Set up the game data object's shape
  const newGameData = {
    nations: {},
    governingOrganizations: {},
    zones: {},
    people: {},
    player: {},
    buildings: {},
    gameDate: new Date("2000-1-1")
  };

  // Generate initial nations
  newGameData.nations = eoe.gameGenerators.generateNations(
    settings.NATIONS_AMT,
    1,
    10
  );

  // For each nation, create a gov org
  Object.values(newGameData.nations).forEach((nation) => {
    const newOrg = eoe.gameGenerators.generateGoverningOrg({
      nationId: nation.id,
    });
    newGameData.governingOrganizations[newOrg.id] = newOrg;
    nation.organizationId = newOrg.id;
  });

  // For each nation, create zones
  Object.values(newGameData.nations).forEach((nation) => {
    const newZones = eoe.gameGenerators.generateZones(nation.size);

    Object.values(newZones).forEach((zone) => {
      newGameData.zones[zone.id] = {
        ...zone,
        nationId: nation.id,
        organizationId: nation.organizationId
      };
    });
  });

  // For each zone, create people
  Object.values(newGameData.zones).forEach((zone) => {
    for (
      let personIndex = 0;
      personIndex < Object.values(newGameData.zones).length;
      personIndex++
    ) {
      const p = eoe.gameGenerators.generatePerson({
        nationId: zone.nationId,
        homeZoneId: zone.id,
      });
      newGameData.people[p.id] = p;
    }
  });

  
  // Create the EVIL Empire
  const evilEmpireNation = eoe.gameGenerators.generateNation({
    name: "EVIL Empire",
    size: 1,
  });
  const evilEmpireOrg = eoe.gameGenerators.generateGoverningOrg({
    nationId: evilEmpireNation.id,
    evil: true,
    name: "EVIL Empire",
  });
  evilEmpireNation.organizationId = evilEmpireOrg.id;
  const evilZone = eoe.gameGenerators.generateZone({
    nationId: evilEmpireNation.id,
    name: "Evil HQ",
    size: 10,
  });

  

  for (let personIndex = 0; personIndex < evilZone.size; personIndex++) {
    const p = eoe.gameGenerators.generatePerson({
      nationId: evilEmpireNation.id,
      homeZoneId: evilZone.id,
    });
    newGameData.people[p.id] = p;
  }
  const evilOverlord = eoe.gameGenerators.generatePerson({
    nationId: evilEmpireNation.id,
    homeZoneId: evilZone.id,
    name: "EVIL Overlord",
    initIntelligence: 10,
    initCombat: 10,
    initLeadership: 10,
    initLoyalty: 100,
    initAdministration: 10
  });
  evilOverlord.agent = eoe.gameGenerators.generateAgentData(
    evilEmpireOrg.id,
    3
  );
  newGameData.people[evilOverlord.id] = evilOverlord;
  newGameData.nations[evilEmpireNation.id] = evilEmpireNation;
  newGameData.governingOrganizations[evilEmpireOrg.id] = evilEmpireOrg;
  newGameData.zones[evilZone.id] = evilZone;
  newGameData.player.empireId = evilEmpireNation.id;
  newGameData.player.overlordId = evilOverlord.id;
  newGameData.player.organizationId = evilEmpireOrg.id;

  // For each zone, create Buildings
  Object.values(newGameData.zones).forEach((zone) => {
    // determine how many buildings are in this zone
    const zoneBuildingsAmt = randomInt(5,10)
    for (
      let buildingIndex = 0;
      buildingIndex < zoneBuildingsAmt;
      buildingIndex++
    ) {
      const buildingType = buildingShufflebag.next();
      const schematic = buildingsSchematics[buildingType];
      const b = eoe.gameGenerators.generateBuilding({
        zoneId: zone.id,
        buildingType: schematic.buildingType,
        infrastructureCost: schematic.infrastructureCost,
        organizationId: newGameData.nations[zone.nationId].organizationId,
        upkeepCost: schematic.upkeepCost
      });
      newGameData.buildings[b.id] = b;
    }
  });


  return newGameData;
};

/**
 * 
 * @param {import("empire-of-evil/src/typedef").GameData} gameData 
 */
export const hireStartingAgents = (gameData) => {
  const zonesArray = toDataArray(gameData.zones)
  const updatedGameData = JSON.parse(JSON.stringify(gameData));
  const updatedPeople = {}
  Object.values(gameData.governingOrganizations).forEach((org) => {
    if (org.id === gameData.player.organizationId){
      return null;
    }
    const orgZones = getControlledZones(zonesArray, org.id);
    const leader = generatePerson({
      homeZoneId: orgZones[0].id,
      nationId: org.nationId,
      initIntelligence: 10,
      initCombat: 10,
      initLeadership: 200,
      initLoyalty: 100,
      initAdministration: 10
    });

    const leaderAgent = generateAgentData(org.id, 3);
    leader.agent = leaderAgent;
    updatedPeople[leader.id] = leader;
    const peopleArray = toDataArray(gameData.people);
    orgZones.forEach(zone =>{
      const zoneCitizens = getZoneCitizens(peopleArray, zone.id);
      for (let recruitIndex = 0; recruitIndex < 10; recruitIndex++) {
        const recruitType = recruitDepartmentShufflebag.next().toString();
        const recruit = zoneCitizens[recruitIndex];
        updatedPeople[recruit.id] = hireAgent(recruit, org.id, recruitType, leader.id, 1);
      }
    })
  });
  updatedGameData.people = {
    ...gameData.people,
    ...updatedPeople
  }
  return updatedGameData;
}
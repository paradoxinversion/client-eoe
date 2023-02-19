import settings from "../config";
const eoe = require("empire-of-evil");

/**
 * Sets up a new EOE game, spawning Nations, Orgs,
 * Zones, and People, including the EVIL Empire.
 * @returns An object containing game data
 */
export const handleNewGame = () => {
  // Set up the game data object's shape
  const newGameData = {
    nations: {},
    governingOrganizations: {},
    zones: {},
    people: {},
    player: {},
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
  });

  // For each nation, create zones
  Object.values(newGameData.nations).forEach((nation) => {
    const newZones = eoe.gameGenerators.generateZones(nation.size);

    Object.values(newZones).forEach((zone) => {
      newGameData.zones[zone.id] = {
        ...zone,
        nationId: nation.id,
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
  });
  evilOverlord.leadership = 20;
  evilOverlord.loyalty = 100;
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
  return newGameData;
};

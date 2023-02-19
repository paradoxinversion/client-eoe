import { toDataArray } from "../utilities/dataHelpers";

const eoe = require("empire-of-evil");

/**
 * Determines what events happen at end of turn and returns
 * updated gamedata with those events.
 * @param {*} gameData 
 * @returns {object}
 */
const advanceDay = (gameData) => {
  // SELECT EVENT
  const recruit = eoe.citizens
    .getCitizens(toDataArray(gameData.people), gameData.player.empireId)
    .filter((person) => !person.agent)[0];
  const TEST_RECRUIT_EVENT = new eoe.gameEvents.EvilApplicantEvent(
    recruit,
    gameData.player.organizationId
  );
  // END SELECT EVENT

  TEST_RECRUIT_EVENT.executeEvent();

  // Make a copy of the game data
  const updatedGameData = JSON.parse(JSON.stringify(gameData));
  // const updatedRecruit = {
  //   ...recruit,
  //   agent: TEST_RECRUIT_EVENT.eventData,
  // };
  // updatedGameData.people[recruit.id] = updatedRecruit;
  updatedGameData.events = [TEST_RECRUIT_EVENT];
  
  console.log(updatedGameData);
  return { updatedGameData };
};

export default advanceDay;

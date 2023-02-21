import { GameEventQueue } from "empire-of-evil/src/gameEvents";
import { toDataArray } from "../utilities/dataHelpers";

const eoe = require("empire-of-evil");

/**
 * Determines what events happen at end of turn and returns
 * updated gamedata with those events.
 * @param {*} gameData
 * @param {GameEventQueue} - gameEventQueue
 * @returns {object}
 */
const advanceDay = (gameData, gameEventQueue) => {
  // SELECT EVENT
  const recruit = eoe.citizens
    .getCitizens(toDataArray(gameData.people), gameData.player.empireId)
    .filter((person) => !person.agent)[0];
  const TEST_RECRUIT_EVENT = new eoe.gameEvents.EvilApplicantEvent(
    recruit,
    gameData.player.organizationId
  );

  // Setup the game event queue
  // const gameEventQueue = new eoe.gameEvents.GameEventQueue([TEST_RECRUIT_EVENT]);
  gameEventQueue.setEvents([TEST_RECRUIT_EVENT]);
  gameEventQueue.executeCurrentEvent();
  // END SELECT EVENT

  // Make a copy of the game data
  const updatedGameData = JSON.parse(JSON.stringify(gameData));
  updatedGameData.events = [TEST_RECRUIT_EVENT];
  updatedGameData.eventQueue = [gameEventQueue];

  return { updatedGameData, gameEventQueue };
};

export default advanceDay;

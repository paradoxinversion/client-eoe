import { toDataArray } from "../utilities/dataHelpers";

const eoe = require("empire-of-evil");

const advanceDay = (gameData) => {
  const eventQueue = new eoe.gameEvents.GameEventQueue([
    eoe.eventGenerators.generateRecruitEvent(
      toDataArray(gameData.people),
      gameData.player.empireId,
      gameData.player.organizationId
    ),
  ]);

  return eventQueue;
};

export default advanceDay;

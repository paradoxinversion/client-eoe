import { toDataArray } from "../utilities/dataHelpers";

const eoe = require("empire-of-evil");

const advanceDay = (gameData) => {
  const recruit = eoe.citizens
    .getCitizens(toDataArray(gameData.people), gameData.player.empireId)
    .filter((person) => !person.agent)[0];
  const TEST_RECRUIT_EVENT = new eoe.gameEvents.RecruitEvent(
    recruit,
    gameData.player.organizationId
  );

  TEST_RECRUIT_EVENT.executeEvent();
  const updatedGameData = JSON.parse(JSON.stringify(gameData));
  const updatedRecruit = {
    ...recruit,
    agent: TEST_RECRUIT_EVENT.eventData,
  };
  updatedGameData.people[recruit.id] = updatedRecruit;
  updatedGameData.events = [TEST_RECRUIT_EVENT];
  console.log("Advance Day", TEST_RECRUIT_EVENT);
  return { events: [TEST_RECRUIT_EVENT], updatedGameData };
};

export default advanceDay;

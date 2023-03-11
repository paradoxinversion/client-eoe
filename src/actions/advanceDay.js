import { prepareRandomEvents } from "../gameEvents/gameEvents";

/**
 * Determines what events happen at end of turn and returns
 * updated gamedata with those events.
 * @param {import("empire-of-evil/src/typedef").GameData} gameData
 * @param {GameEventQueue} - gameEventQueue
 * @param {ActivityManager} - activityManager
 * @returns {object}
 */
const advanceDay = (gameData, gameEventQueue, activityManager) => {
  const events = prepareRandomEvents(gameData);

  const activities = activityManager.executeActivities();
  gameEventQueue.setEvents(events);

  /**
   * @type {import("empire-of-evil/src/typedef").GameData}
   */
  const updatedGameData = JSON.parse(JSON.stringify(gameData));
  activities.forEach(activity => {
    if (activity.result.people){
      updatedGameData.people = {
        ...activity.result.people,
        ...updatedGameData.people,
      }
    }
  });
  
  const gameDate = new Date(gameData.gameDate);
  gameDate.setDate(gameDate.getDate() + 1);
  updatedGameData.gameDate = gameDate;
  
  return { updatedGameData, gameEventQueue };
};

export default advanceDay;

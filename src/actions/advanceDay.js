import { GameEventQueue } from "empire-of-evil/src/gameEvents";
import { ActivityManager } from "empire-of-evil/src/plots";
import { prepareRandomEvents } from "../gameEvents/gameEvents";

/**
 * Determines what events happen at end of turn and returns
 * updated gamedata with those events.
 * @param {*} gameData
 * @param {GameEventQueue} - gameEventQueue
 * @param {ActivityManager} - activityManager
 * @returns {object}
 */
const advanceDay = (gameData, gameEventQueue, activityManager) => {
  const events = prepareRandomEvents(gameData);

  const activities = activityManager.executeActivities();
  gameEventQueue.setEvents(events);
  const updatedGameData = JSON.parse(JSON.stringify(gameData));
  activities.forEach(activity => {
    if (activity.result.people){
      console.log(activity.result.people)
      console.log("P", {...activity.result.people})
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

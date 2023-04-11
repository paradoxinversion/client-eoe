import { serializeGameData } from "empire-of-evil/src/dataManagement";

/**
 * 
 * @param {import("empire-of-evil/src/typedef").GameData} gameData 
 * @param {ActivityManager} activityManager 
 */
export const saveGame = (gameData, activityManager, plotManager) => {
  localStorage.setItem("eoe-save", serializeGameData(gameData, activityManager, plotManager));
}

/**
 * 
 * @param {import("empire-of-evil/src/typedef").GameData} gameData 
 * @param {ActivityManager} activityManager 
 */
export const deleteSavedGame = () => {
  localStorage.removeItem("eoe-save");
}
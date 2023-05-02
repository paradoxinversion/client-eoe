import { GameManager } from "empire-of-evil";
import { serializeGameData } from "empire-of-evil/src/dataManagement";

/**
 * 
 * @param {GameManager} gameManager 
 * @param {ActivityManager} activityManager 
 */
export const saveGame = (gameManager, activityManager, plotManager) => {
  localStorage.setItem("eoe-save", serializeGameData(gameManager, activityManager, plotManager));
}

/**
 * 
 * @param {import("empire-of-evil/src/typedef").GameData} gameData 
 * @param {ActivityManager} activityManager 
 */
export const deleteSavedGame = () => {
  localStorage.removeItem("eoe-save");
}
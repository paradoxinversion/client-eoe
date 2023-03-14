/**
 * 
 * @param {import("empire-of-evil/src/typedef").GameData} gameData 
 * @param {ActivityManager} activityManager 
 */
export const saveGame = (gameData, activityManager) => {
  // const data = JSON.stringify(gameData);
  const activitiesData = activityManager.serializeActivities()
  
  /**
   * @type {import("empire-of-evil/src/typedef").SaveData}
   */
  const saveData =  {
    gameData,
    plotData: {
      activities: activitiesData
    }
  }
  console.log(saveData)

  const data = JSON.stringify(saveData);
  localStorage.setItem("eoe-save", data);
}
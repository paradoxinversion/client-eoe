import { ActivityManager, populateActivities, populatePlots } from "empire-of-evil/src/plots";
import { useState } from "react";

/**
 * 
 * @param {Object} props
 * @param {ActivityManager} props.activityManager
 * @param {PlotManager} props.plotManager
 * @returns 
 */
const TitleScreen = (props) => {
  const [saveData, setSaveData] = useState(localStorage.getItem("eoe-save"))
  const { setScreen, setGameData, activityManager, plotManager } = props;
  return (
    <div className="grid justify-items-center">
      <p className="grid text-4xl w-fit place-self-center my-4">
        Empire of EVIL
      </p>
      <div className="bg-stone-700 rounded p-4 m-4">
        <p>An Evil Overlord Simulator by Jedai Saboteur.</p>
      </div>
      <div>
        <button
          className="p-2 bg-stone-700 hover:bg-stone-800"
          onClick={() => {
            setScreen("new-game");
          }}
        >
          New Session
        </button>

        {saveData && (
          <button
            className="p-2 bg-stone-700 hover:bg-stone-800"
            onClick={() => {
              /**
               * @type {import("empire-of-evil/src/typedef").SaveData}
               */
              const saveData = JSON.parse(saveData);
              populateActivities(activityManager);
              populatePlots(plotManager);
              console.log(saveData)
              Object.values(saveData.plotData.activities).map(activity => {
                const currentActivity = activityManager.activities.find(a => a.name === activity.name);
                currentActivity.setAgents(activity.agents);
              })
              setGameData(saveData.gameData);
              setScreen("main");
            }}
          >
            Continue Session
          </button>
        )}
        {saveData && (
          <button
            className="p-2 bg-stone-700 hover:bg-stone-800"
            onClick={() => {
              localStorage.removeItem("eoe-save");
              setSaveData(null)
            }}
          >
            Delete Session
          </button>
        )}
      </div>
    </div>
  );
};

export default TitleScreen;

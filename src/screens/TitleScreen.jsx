import { populateActivities, populatePlots } from "empire-of-evil/src/plots";
import React, { useState } from "react";
import { deleteSavedGame } from "../actions/dataManagement";
import {GameManager} from "empire-of-evil";

/**
 *
 * @param {Object} props
 * @param {GameManager} props.gameManager
 * @returns
 */
function TitleScreen(props) {
  const [saveData, setSaveData] = useState(localStorage.getItem("eoe-save"));
  const { setScreen, setGameData, gameManager } = props;
  return (
    <div className="grid justify-items-center">
      <section className="flex justify-end bg-stone-900 w-full text-white shadow-lg">
        <button
          className="btn flex hover:bg-stone-800 items-center"
          onClick={() => {
            setScreen("new-game");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
            />
          </svg>
          New Session
        </button>
        {saveData && (
          <>
            <button
              className="btn flex hover:bg-stone-800 items-center"
              onClick={() => {
                /**
                 * @type {import("empire-of-evil/src/typedef").SaveData}
                 */
                const sd = JSON.parse(saveData);
                populateActivities(gameManager);
                populatePlots(gameManager);
                gameManager.plotManager.setPlotQueue(sd.plotData.plots)
                Object.values(sd.plotData.activities).forEach((activity) => {
                  const currentActivity = gameManager.activityManager.activities.find(
                    (a) => a.name === activity.name
                  );
                  currentActivity.setAgents(activity.agents);
                });
                gameManager.setGameData(sd.gameData);
                gameManager.setInitialized(true);
                setScreen("main");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
              Continue Session
            </button>
            <button
              className="btn flex items-center hover:bg-stone-800"
              onClick={() => {
                deleteSavedGame();
                setSaveData(null);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                />
              </svg>
              Delete Session
            </button>
          </>
        )}
      </section>
      <p className="grid text-6xl w-fit place-self-center my-4 font-bold">
        Empire of EVIL
      </p>
      <p>An Evil Overlord Simulator by Jedai Saboteur.</p>
      <div className="w-3/4 p-4 m-4 flex justify-between text-stone-600">
        <section className="title-feature-card ">
          <p className="text-xl font-semibold mb-4">Execute EVIL Plots</p>
          <p>Create an Empire capable of generating the resources you need to unleash EVIL plots upon an unsuspecting world!</p>
        </section>
        <section className="title-feature-card">
          <p className="text-xl font-semibold mb-4">Recruit EVIL Agents</p>
          <p>Amass your own personal army of loyal EVIL Agents to carry out your dastardly schemes.</p>
        </section>
        <section className="title-feature-card">
          <p className="text-xl font-semibold mb-4">Take Over the World</p>
          <p>Use your wit and careful planning to strategically take over the world!</p>
        </section>
      </div>
      <div>
        <p className="text-2xl font-semibold text-stone-600">{saveData ? "Continue your session today!" : "Start a New Session Today!"}</p>
      </div>
    </div>
  );
};

export default TitleScreen;

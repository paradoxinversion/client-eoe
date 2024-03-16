import { GameManager } from "empire-of-evil";
import { serializeGameData } from "empire-of-evil/src/dataManagement";
import {
  Activity,
  ActivityManager,
  PlotManager,
  populateActivities,
  populatePlots,
} from "empire-of-evil/src/plots";
import { store } from "../app/store";
import { setGoverningOrganizations } from "../features/governingOrganizationSlice";
import { setNations } from "../features/nationSlice";
import { setZones } from "../features/zoneSlice";
import { setBuildings } from "../features/buildingSlice";
import { setPeople } from "../features/personSlice";
import { setInitialized } from "../features/gameManagerSlice";
import { setProjects } from "../features/scienceSlice";
import { setScreen } from "../features/screenSlice";
import { GameData, GameLog } from "empire-of-evil/src/GameManager";
import {
  handleNewGame,
  hireStartingAgents,
} from "empire-of-evil/src/gameSetup";
import { updateSimActions } from "../features/gameLogSlice";

export const saveGame = (gameManager: GameManager) => {
  localStorage.setItem("eoe-save", serializeGameData(gameManager));
};

export const loadGame = (gameManager: GameManager) => {
  const { plotManager, activityManager, scienceManager } = gameManager;
  const saveData = store.getState().gameManager.saveData;
  populateActivities(gameManager);
  populatePlots(gameManager);
  plotManager.setPlotQueue(saveData.plotData.plots);
  Object.values(saveData.plotData.activities).forEach((activity: Activity) => {
    const currentActivity = activityManager.activities.find(
      (a) => a.name === activity.name
    );
    currentActivity.setAgents(activity.agents);
  });
  gameManager.setGameData(saveData.gameData);
  gameManager.setInitialized(true);
  const { governingOrganizations, nations, zones, buildings, people } =
    gameManager.gameData;

  // Update the redux store
  store.dispatch(setGoverningOrganizations(governingOrganizations));
  store.dispatch(setNations(nations));
  store.dispatch(setZones(zones));
  store.dispatch(setBuildings(buildings));
  store.dispatch(setPeople(people));
  store.dispatch(setInitialized(true));
  store.dispatch(setProjects(scienceManager.activeProjects));
  store.dispatch(setScreen("main"));
};

export const deleteSavedGame = () => {
  localStorage.removeItem("eoe-save");
};

export const newGame = (gameManager: GameManager) => {
  handleNewGame(gameManager);
  hireStartingAgents(gameManager);
  populateActivities(gameManager);
  populatePlots(gameManager);
  gameManager.setInitialized(true);
  const { governingOrganizations, nations, zones, buildings, people } =
    gameManager.gameData;

  // Update the redux store
  store.dispatch(setGoverningOrganizations(governingOrganizations));
  store.dispatch(setNations(nations));
  store.dispatch(setZones(zones));
  store.dispatch(setBuildings(buildings));
  store.dispatch(setPeople(people));
  store.dispatch(setInitialized(true));

  // setScreen("main");
  store.dispatch(setScreen("main"));
};

/**
 * Update the game data and the redux store
 */
export const updateGameData = (
  gameManager: GameManager,
  updatedGameData: Partial<GameData>,
  updatedLog?: Partial<GameLog>
) => {
  gameManager.updateGameData(updatedGameData);
  const { governingOrganizations, nations, zones, buildings, people } =
    gameManager.gameData;
  store.dispatch(setGoverningOrganizations(governingOrganizations));
  store.dispatch(setNations(nations));
  store.dispatch(setZones(zones));
  store.dispatch(setBuildings(buildings));
  store.dispatch(setPeople(people));
  if (updatedLog?.simActions) {
    store.dispatch(updateSimActions(updatedLog.simActions));
  }
};

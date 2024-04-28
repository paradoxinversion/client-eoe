import { GameManager } from "empire-of-evil";
import { serializeGameData } from "empire-of-evil/src/dataManagement";
import { populateActivities, populatePlots } from "empire-of-evil/src/plots";
import Activity from "empire-of-evil/src/activities/Activity";
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
  NewGameOptions,
  handleNewGameV2,
  hireStartingAgents,
} from "empire-of-evil/src/gameSetup";
import { updateSimActions } from "../features/gameLogSlice";

export const saveGame = () => {
  localStorage.setItem("eoe-save", serializeGameData());
};

export const loadGame = () => {
  const { plotManager, activityManager, scienceManager } =
    GameManager.getInstance();
  const saveData = store.getState().gameManager.saveData;
  populateActivities();
  populatePlots();
  // recreate plots
  const oldPlots = saveData.plotData.plots.map((plot) => {
    return plotManager.addPlot(plot);
  });
  Object.values(saveData.plotData.activities).forEach((activity: Activity) => {
    const currentActivity = activityManager.activities.find(
      (a) => a.name === activity.name
    );
    currentActivity.setAgents(activity.agents);
  });
  GameManager.getInstance().setGameData(saveData.gameData);
  GameManager.getInstance().setInitialized(true);
  const { governingOrganizations, nations, zones, buildings, people } =
    GameManager.getInstance().gameData;

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

export const newGame = (options: NewGameOptions) => {
  // handleNewGame(options);
  handleNewGameV2(options);
  hireStartingAgents();
  populateActivities();
  populatePlots();
  GameManager.getInstance().setInitialized(true);
  const { governingOrganizations, nations, zones, buildings, people } =
    GameManager.getInstance().gameData;

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
  updatedGameData: Partial<GameData>,
  updatedLog?: Partial<GameLog>
) => {
  GameManager.getInstance().updateGameData(updatedGameData);
  const { governingOrganizations, nations, zones, buildings, people } =
    GameManager.getInstance().gameData;
  store.dispatch(setGoverningOrganizations(governingOrganizations));
  store.dispatch(setNations(nations));
  store.dispatch(setZones(zones));
  store.dispatch(setBuildings(buildings));
  store.dispatch(setPeople(people));
  if (updatedLog?.simActions) {
    store.dispatch(updateSimActions(updatedLog.simActions));
  }
};

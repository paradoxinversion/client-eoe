import { managers, dataManagement, utils } from "empire-of-evil";
import { store } from "../app/store";
import { setGoverningOrganizations } from "../features/governingOrganizationSlice";
import { setNations } from "../features/nationSlice";
import { setZones } from "../features/zoneSlice";
import { setBuildings } from "../features/buildingSlice";
import { setPeople } from "../features/personSlice";
import { setInitialized } from "../features/gameManagerSlice";
import { setProjects } from "../features/scienceSlice";
import { setScreen } from "../features/screenSlice";
import { updateSimActions } from "../features/gameLogSlice";
import PlayerManager from "empire-of-evil/src/managers/cpu/PlayerManager";
import Player from "empire-of-evil/src/managers/cpu/Player";
import { SaveData } from "empire-of-evil/src/dataManagement/dataManagement";
import { NewGameOptions } from "empire-of-evil/src/gameSetup";
import {
  GameData,
  GameLog,
} from "empire-of-evil/src/managers/game/GameManager";
import Activity from "empire-of-evil/src/managers/activities/Activity";

const GameManager = managers.game.GameManager;

export const saveGame = () => {
  localStorage.setItem("eoe-save", dataManagement.serializeGameData());
};

export const loadGame = (saveData: SaveData) => {
  GameManager.getInstance();

  // load players
  const players = saveData.playerData.map((player) => new Player(player));
  PlayerManager.getInstance().setPlayers(players);
  managers.activities.ActivityManager.getInstance().populateActivities();
  managers.plots.PlotManager.getInstance().populatePlots();

  // recreate plots
  const oldPlots = saveData.plotData.plots.map((plot) => {
    return managers.plots.PlotManager.getInstance().addPlot(plot);
  });
  Object.values(saveData.plotData.activities).forEach((activity) => {
    const currentActivity =
      managers.activities.ActivityManager.getInstance().activities.find(
        (a) => a.name === activity.name
      );
    if (currentActivity) {
      currentActivity.setAgents(activity.agents);
    }
  });
  managers.science.ScienceManager.getInstance().activeProjects =
    saveData.scienceData.activeProjects;
  managers.game.GameManager.getInstance().setGameData(saveData.gameData);
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
  store.dispatch(
    setProjects(managers.science.ScienceManager.getInstance().activeProjects)
  );
  store.dispatch(setScreen("main"));
};

export const deleteSavedGame = () => {
  localStorage.removeItem("eoe-save");
};

export const newGame = (options: NewGameOptions) => {
  utils.gameSetup.newGame(options);
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
  // GameManager.getInstance().updateGameData(updatedGameData);
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

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import gameManagerReducer from "../features/gameManagerSlice";
import governingOrganizationReducer from "../features/governingOrganizationSlice";
import nationReducer from "../features/nationSlice";
import zoneReducer from "../features/zoneSlice";
import peopleReducer from "../features/personSlice";
import buildingReducer from "../features/buildingSlice";
import screenReducer from "../features/screenSlice";
import selectionReducer from "../features/selectionSlice";
import configReducer from "../features/configSlice";
import scienceReducer from "../features/scienceSlice";
import gameLogReducer from "../features/gameLogSlice";
import { config } from "../config/config";
const rootReducer = combineReducers({
  gameManager: gameManagerReducer,
  governingOrganizations: governingOrganizationReducer,
  nations: nationReducer,
  zones: zoneReducer,
  people: peopleReducer,
  buildings: buildingReducer,
  screen: screenReducer,
  selections: selectionReducer,
  config: configReducer,
  science: scienceReducer,
  gameLog: gameLogReducer,
});

export function setupStore(preloadedState) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export const store = setupStore({
  gameManager: {
    initialized: false,
    saveData: JSON.parse(localStorage.getItem("eoe-save")),
  },
  config: config(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

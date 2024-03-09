import { combineReducers, configureStore } from '@reduxjs/toolkit'
import gameManagerReducer from '../features/gameManagerSlice'
import governingOrganizationReducer from '../features/governingOrganizationSlice';
import nationReducer from '../features/nationSlice';
import zoneReducer from '../features/zoneSlice';
import peopleReducer from '../features/personSlice';
import buildingReducer from '../features/buildingSlice';
import screenReducer from '../features/screenSlice'
import selectionReducer from '../features/selectionSlice';
const rootReducer = combineReducers({
    gameManager: gameManagerReducer,
    governingOrganizations: governingOrganizationReducer,
    nations: nationReducer,
    zones: zoneReducer,
    people: peopleReducer,
    buildings: buildingReducer,
    screen: screenReducer,
    selections: selectionReducer
});

export function setupStore(preloadedState){
    return configureStore({
      reducer: rootReducer,
      preloadedState
    })
};

export const store = setupStore({
  gameManager:{ 
    initialized: false,
    saveData: localStorage.getItem("eoe-save")
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



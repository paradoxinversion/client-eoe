import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GameLog } from "empire-of-evil/src/managers/game/GameManager";

const INITIAL_STATE: GameLog = {
  simActions: {
    people: {},
  },
  events: [],
};

export const gameLogSlice = createSlice({
  name: "gameLog",
  initialState: INITIAL_STATE,
  reducers: {
    addEventLog: (state, action) => {
      // const s = [...state.events];
      // s.push(action.payload);
      // return {
      //   ...state,
      //   events: s,
      // };

      state = {
        ...state,
        events: [...state.events, action.payload],
      };
    },
    updateSimActions: (state, action) => {
      return {
        ...state,

        ...action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateSimActions, addEventLog } = gameLogSlice.actions;

export default gameLogSlice.reducer;

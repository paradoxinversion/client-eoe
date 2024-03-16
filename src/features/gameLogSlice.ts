import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GameLog } from "empire-of-evil/src/GameManager";

const INITIAL_STATE: GameLog = {
  simActions: {
    people: {},
  },
};

export const gameLogSlice = createSlice({
  name: "gameLog",
  initialState: INITIAL_STATE,
  reducers: {
    updateSimActions: (state, action) => {
      return {
        ...state,
        simActions: {
          ...state.simActions,
          ...action.payload,
        },
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateSimActions } = gameLogSlice.actions;

export default gameLogSlice.reducer;

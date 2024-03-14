import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { config } from "../config/config";

interface ConfigState {
  haltReload: boolean;
}

const INITIAL_CONFIG_STATE: ConfigState = {
  haltReload: false,
};

export const configSlice = createSlice({
  name: "buildings",
  initialState: INITIAL_CONFIG_STATE,
  reducers: {
    initializeConfig: (state) => {
      return config();
    },
  },
});

export const { initializeConfig } = configSlice.actions;

export default configSlice.reducer;

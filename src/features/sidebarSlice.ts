import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { config } from "../config/config";

interface SidebarState {
  sidebarOpen: boolean;
}

const INITIAL_CONFIG_STATE: SidebarState = {
  sidebarOpen: true,
};

export const configSlice = createSlice({
  name: "sidebar",
  initialState: INITIAL_CONFIG_STATE,
  reducers: {
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
  },
});

export const { setSidebarOpen } = configSlice.actions;

export default configSlice.reducer;

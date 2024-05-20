import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Plot from "empire-of-evil/src/plots/Plot";
import Activity from "empire-of-evil/src/activities/Activity";
import {
  Building,
  GoverningOrganization,
  Nation,
  Person,
  Zone,
} from "empire-of-evil/src/types/interfaces/entities";

interface SelectionState {
  governmentOrganization: GoverningOrganization | null;
  zone: Zone | null;
  nation: Nation | null;
  person: Person | null;
  building: Building | null;
  plot: Plot | null;
  activity: Activity | null;
}

const INITIAL_SELECTION_STATE: SelectionState = {
  governmentOrganization: null,
  zone: null,
  nation: null,
  person: null,
  building: null,
  plot: null,
  activity: null,
};

export const selectionSlice = createSlice({
  name: "selection",
  initialState: INITIAL_SELECTION_STATE,
  reducers: {
    clearSelections: () => {
      return INITIAL_SELECTION_STATE;
    },
    /**
     * Requires a type and selection
     */
    selectEntity: (
      state,
      action: PayloadAction<{ type: string; selection: Object | null }>
    ) => {
      return {
        ...state,
        [action.payload.type]: action.payload.selection,
      };
    },
  },
});

export const { clearSelections, selectEntity } = selectionSlice.actions;

export default selectionSlice.reducer;

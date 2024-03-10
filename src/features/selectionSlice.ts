import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Activity, Plot } from 'empire-of-evil/src/plots';
import { Building, GoverningOrganization, Nation, Person, Zone } from 'empire-of-evil/src/types/interfaces/entities';

interface SelectionState {
  governmentOrganization: GoverningOrganization,
  zone: Zone,
  nation: Nation,
  person: Person,
  building: Building,
  plot: Plot,
  activity: Activity
}

const INITIAL_SELECTION_STATE: SelectionState = {
  governmentOrganization: null,
  zone: null,
  nation: null,
  person: null,
  building: null,
  plot: null,
  activity: null
}

export const selectionSlice = createSlice({
  name: 'selection',
  initialState: INITIAL_SELECTION_STATE,
  reducers: {
    clearSelections: () => {
      return INITIAL_SELECTION_STATE;
    },
    /**
     * Requires a type and selection
     */
    selectEntity: (state, action: PayloadAction<{type: string, selection: Object}>) => {
      return {
        ...state,
        [action.payload.type]: action.payload.selection
      }
    }
  }
})

export const { clearSelections, selectEntity } = selectionSlice.actions

export default selectionSlice.reducer
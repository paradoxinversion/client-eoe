import { createSlice } from '@reduxjs/toolkit'

const INITIAL_SELECTION_STATE = {
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
    clearSelections: (state, action) => {
      return INITIAL_SELECTION_STATE;
    },
    /**
     * Requires a type and selection
     */
    selectEntity: (state, action) => {
      return {
        ...state,
        [action.payload.type]: action.payload.selection
      }
    }
  }
})

export const { clearSelections, selectEntity } = selectionSlice.actions

export default selectionSlice.reducer
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Building } from 'empire-of-evil/src/types/interfaces/entities'

interface BuildingState {
  [x: string]: Building
}

const INITIAL_BUILDING_STATE: BuildingState = {}

export const buildingSlice = createSlice({
  name: 'buildings',
  initialState: INITIAL_BUILDING_STATE,
  reducers: {
    setBuildings: (state, action: PayloadAction<{[x:string]: Building}>) => {
      return {
        ...state,
        ...action.payload
      }
    },
  }
})

export const { setBuildings } = buildingSlice.actions

export default buildingSlice.reducer
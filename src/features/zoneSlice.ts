import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Zone } from 'empire-of-evil/src/types/interfaces/entities'

const INITIAL_ZONE_STATE: {[x: string]: Zone} = {
}

export const zoneSlice = createSlice({
  name: 'zones',
  initialState: INITIAL_ZONE_STATE,
  reducers: {
    setZones: (state, action: PayloadAction<{[x:string]: Zone}>) => {
      return {
        ...state,
        ...action.payload,
      }
    },
  }
})

export const { setZones } = zoneSlice.actions

export default zoneSlice.reducer
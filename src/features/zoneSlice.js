import { createSlice } from '@reduxjs/toolkit'

export const zoneSlice = createSlice({
  name: 'zones',
  initialState: {},
  reducers: {
    setZones: (state, action) => {
      return {
        ...state,
        ...action.payload,
      }
    },
  }
})

export const { setZones } = zoneSlice.actions

export default zoneSlice.reducer
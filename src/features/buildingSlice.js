import { createSlice } from '@reduxjs/toolkit'

export const buildingSlice = createSlice({
  name: 'buildings',
  initialState: {},
  reducers: {
    setBuildings: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    },
  }
})

export const { setBuildings } = buildingSlice.actions

export default buildingSlice.reducer
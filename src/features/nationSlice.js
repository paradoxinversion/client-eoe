import { createSlice } from '@reduxjs/toolkit'

export const nationSlice = createSlice({
  name: 'nations',
  initialState: {},
  reducers: {
    setNations: (state, action) => {
      return {
        ...state,
        ...action.payload,
      }
    },
  }
})

export const { setNations } = nationSlice.actions

export default nationSlice.reducer
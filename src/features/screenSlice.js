import { createSlice } from '@reduxjs/toolkit'

export const screenSlice = createSlice({
  name: 'screen',
  initialState: 'title',
  reducers: {
    setScreen: (state, action) => {
      return action.payload;
    },
  }
})

export const { setScreen } = screenSlice.actions

export default screenSlice.reducer
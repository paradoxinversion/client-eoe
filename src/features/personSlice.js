import { createSlice } from '@reduxjs/toolkit'

export const personSlice = createSlice({
  name: 'people',
  initialState: {},
  reducers: {
    setPeople: (state, action) => {
      return {
        ...state,
        ...action.payload,
      }
    },
  }
})

export const { setPeople } = personSlice.actions

export default personSlice.reducer
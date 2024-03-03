import { createSlice } from '@reduxjs/toolkit'

export const governingOrganizationSlice = createSlice({
  name: 'governingOrganizations',
  initialState: {},
  reducers: {
    setGoverningOrganizations: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // state = action.payload;
      return {
        ...state,
        ...action.payload
      }
    },
  }
})

// Action creators are generated for each case reducer function
export const { setGoverningOrganizations } = governingOrganizationSlice.actions

export default governingOrganizationSlice.reducer
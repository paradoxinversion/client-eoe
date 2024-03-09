import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export const gameManagerSlice = createSlice({
  name: 'gameManager',
  initialState: {
    initialized: false,
    saveData: null
  },
  reducers: {
    setInitialized: (state, action: PayloadAction<boolean>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.initialized = true;
    },
    setSaveData: (state, action) => {
      return {
        ...state,
        saveData: {
          ...action.payload
        }
      }
    },
  }
})

// Action creators are generated for each case reducer function
export const { setInitialized } = gameManagerSlice.actions

export default gameManagerSlice.reducer
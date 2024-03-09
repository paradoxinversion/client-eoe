import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Nation } from 'empire-of-evil/src/types/interfaces/entities'

interface NationState {
  [x: string]: Nation
}

const INITIAL_NATION_STATE: NationState = {}

export const nationSlice = createSlice({
  name: 'nations',
  initialState: INITIAL_NATION_STATE,
  reducers: {
    setNations: (state, action: PayloadAction<{[x:string]: Nation}>) => {
      return {
        ...state,
        ...action.payload,
      }
    },
  }
})

export const { setNations } = nationSlice.actions

export default nationSlice.reducer
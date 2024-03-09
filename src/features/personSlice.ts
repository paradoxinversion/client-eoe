import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Person } from 'empire-of-evil/src/types/interfaces/entities'

interface PersonState {
  [x: string]: Person
}

const INITIAL_PERSON_STATE: PersonState = {}

export const personSlice = createSlice({
  name: 'people',
  initialState: INITIAL_PERSON_STATE,
  reducers: {
    setPeople: (state, action: PayloadAction<{[x:string]: Person}>) => {
      return {
        ...state,
        ...action.payload,
      }
    },
  }
})

export const { setPeople } = personSlice.actions

export default personSlice.reducer
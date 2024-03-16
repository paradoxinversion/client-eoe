import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ScienceProject, ScienceProjectStatus } from 'empire-of-evil/src/managers/scienceProjects';


export interface ScienceState {
  activeProjects: ScienceProjectStatus[]
}

const initialState: ScienceState = { activeProjects: [] }
export const scienceSlice = createSlice({
  name: 'science',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<ScienceProjectStatus[]>) => {
      return {
        ...state,
        activeProjects: action.payload,
      }
    },
  }
})

export const { setProjects } = scienceSlice.actions

export default scienceSlice.reducer
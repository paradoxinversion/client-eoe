import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Activity from "empire-of-evil/src/activities/Activity";
import { RootState } from "../../app/store";

type ActivitySelection = Pick<
  Activity,
  "agents" | "name" | "type" | "costPerParticipant"
>;

export interface ActivityParticipantSelectorState {
  activity: ActivitySelection | null;
  selectedAgents: string[];
}

const INITIAL_STATE: ActivityParticipantSelectorState = {
  activity: null,
  selectedAgents: [],
};

export const activityParticipantSelectorSlice = createSlice({
  name: "activityParticipantSelector",
  initialState: INITIAL_STATE,
  reducers: {
    setActivity: (state, action: PayloadAction<ActivitySelection>) => {
      state.activity = action.payload;
    },
    setSelectedAgents: (state, action: PayloadAction<string[]>) => {
      state.selectedAgents = action.payload;
    },
  },
});

export const { setActivity, setSelectedAgents } =
  activityParticipantSelectorSlice.actions;

// export const selectParticipationActivity = (state: RootState) =>
//   state.activityParticipantSelector.activity;

//   export const selectActivityParticipants = (state: RootState) =>
//   state.activityParticipantSelector.selectedAgents;
export default activityParticipantSelectorSlice.reducer;

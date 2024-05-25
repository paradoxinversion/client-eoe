import {
  Box,
  Button,
  Typography,
  Divider,
  Grid,
  Paper,
  Dialog,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { selectEntity } from "../../../../features/selectionSlice";
import { useState } from "react";
import { managers, actions } from "empire-of-evil";
import DataGrid from "react-data-grid";
import { updateGameData } from "../../../../actions/dataManagement";
import {
  setActivity,
  setSelectedAgents,
} from "../../../../features/ActivityParticipantSelector/ActivityParticipantSelectorSlice";
import Activity from "empire-of-evil/src/managers/activities/Activity";
import { ActivityConfig } from "empire-of-evil/src/managers/activities/activityConfig";
import AgentSelector from "../../../elements/Selectors/AgentSelector/AgentSelector";
import { Person } from "empire-of-evil/src/types/interfaces/entities";
import ActivityParticipantDialog from "./ActivityParticipantDialog/ActivityParticipantDialog";

const activitiesColumns = [
  { key: "agent", name: "Agent" },
  { key: "activity", name: "Activity" },
];
type ActivitiesOverviewProps = {
  selectedAgents: string[];
};
const ActivitiesOverview = () => {
  const dispatch = useAppDispatch();
  const { gameData } = managers.game.GameManager.getInstance();
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
  const [activityOpen, setActivityOpen] = useState(false);
  const selectedAgents = useAppSelector(
    (state) => state.activityParticipantSelector.selectedAgents
  );
  /**
   * Handler for when an activity is clicked
   */
  const onClickActivity = (activity: Activity) => {
    dispatch(
      selectEntity({
        type: "activity",
        selection: { name: activity.name, agents: activity.agents },
      })
    );
    dispatch(
      setActivity({
        name: activity.name,
        agents: activity.agents,
        type: activity.type,
        costPerParticipant: activity.costPerParticipant,
      })
    );
    setCurrentActivity(activity);
    setActivityOpen(true);
  };

  //Rows for the activity participants
  const activityParticipantRows =
    managers.activities.ActivityManager.getInstance()
      .getActivityParticipants()
      .map((participant) => ({
        agent: participant.participant.name,
        activity: participant.activity,
      }));

  /**
   *
   */
  const onSelectAgent = (agent: Person) => {
    const participantId = agent.id;
    if (currentActivity) {
      if (currentActivity.agents.includes(participantId)) {
        const update = currentActivity.removeAgent(
          gameData.people[participantId].id
        );
        updateGameData(update);
        dispatch(
          setSelectedAgents(
            currentActivity.agents.filter((a) => a !== participantId)
          )
        );
      } else {
        const update = currentActivity.addAgent(
          gameData.people[participantId].id
        );
        updateGameData(update);
        dispatch(setSelectedAgents(currentActivity.agents));
      }
    }
  };

  return (
    <>
      <Box className="">
        <Box component="header">
          <Typography variant="h5">Activities</Typography>
        </Box>
        <Box>
          <Box component="header">
            <Typography variant="overline">Available Activities</Typography>
          </Box>
          <Divider />
          <Box padding="1rem">
            <Grid container>
              {managers.activities.ActivityManager.getInstance()
                .activities.filter((activity) => {
                  const activityConfiguration: ActivityConfig =
                    managers.activities.activityConfig.find(
                      (a) => a.type === activity.type
                    )!;
                  if (
                    activityConfiguration.requirements?.orgStatusEffects
                      .length! > 0
                  ) {
                    let failed = false;
                    activityConfiguration?.requirements?.orgStatusEffects.forEach(
                      (effect) => {
                        if (
                          !actions.organization
                            .getEvilEmpire()
                            .statusEffects.includes(effect)
                        ) {
                          failed = true;
                        }
                      }
                    );
                    if (failed) {
                      return false;
                    }
                  }
                  return true;
                })
                .map((activity) => (
                  <Grid key={activity.name} item>
                    <Button
                      onClick={() => {
                        onClickActivity(activity);
                      }}
                    >
                      {activity.name}
                    </Button>
                  </Grid>
                ))}
            </Grid>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box>
        <Box>
          <Box>
            <Box component="header">
              <Typography variant="overline">Activity Participants</Typography>
            </Box>
            <Paper>
              <DataGrid
                rows={activityParticipantRows}
                columns={activitiesColumns}
              />
            </Paper>
          </Box>
        </Box>
      </Box>
      {currentActivity && (
        <ActivityParticipantDialog
          open={activityOpen}
          activity={currentActivity}
          selectedAgents={currentActivity.agents}
          onSelectAgent={onSelectAgent}
          onClose={() => {
            dispatch(
              selectEntity({
                type: "activity",
                selection: null,
              })
            );
            setCurrentActivity(null);
            setActivityOpen(false);
            dispatch(setActivity(null));
            dispatch(setSelectedAgents([]));
          }}
        />
      )}
    </>
  );
};

export default ActivitiesOverview;

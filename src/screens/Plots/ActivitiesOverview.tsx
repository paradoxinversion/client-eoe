import {
  Box,
  Button,
  Typography,
  Divider,
  Grid,
  Paper,
  Dialog,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectEntity } from "../../features/selectionSlice";
import { useState } from "react";
import Activity from "empire-of-evil/src/activities/Activity";
import { plots, actions, GameManager } from "empire-of-evil";
import DataGrid from "react-data-grid";
import AgentSelector from "../../elements/AgentSelector/AgentSelector";
import { updateGameData } from "../../actions/dataManagement";
import {
  setActivity,
  setSelectedAgents,
} from "../../features/ActivityParticipantSelector/ActivityParticipantSelectorSlice";
import { current } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import activityConfig, {
  ActivityConfig,
} from "empire-of-evil/src/activities/activityConfig";
import { getEvilEmpire } from "empire-of-evil/src/organization";

const activitiesColumns = [
  { key: "agent", name: "Agent" },
  { key: "activity", name: "Activity" },
];

const ActivitiesOverview = () => {
  const dispatch = useAppDispatch();
  const { gameData, activityManager } = GameManager.getInstance();
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
  const [activityOpen, setActivityOpen] = useState(false);
  const selectedAgents = useAppSelector(
    (state) => state.activityParticipantSelector.selectedAgents
  );
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
    console.log(activity);
  };

  const activityRows = plots
    .getActivityParticipants()
    .map((participant, index) => ({
      agent: participant.participant.name,
      activity: participant.activity,
    }));

  const onUpdateActivityParticipant = (participantId: string, add: boolean) => {
    if (add) {
      const update = currentActivity.addAgent(
        gameData.people[participantId].id
      );
      updateGameData(update);
    } else {
      const update = currentActivity.removeAgent(
        gameData.people[participantId].id
      );

      updateGameData(update);
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
              {activityManager.activities
                .filter((activity) => {
                  const conf: ActivityConfig = activityConfig.find(
                    (a) => a.type === activity.type
                  );
                  if (conf?.requirements?.orgStatusEffects.length > 0) {
                    let failed = false;
                    conf?.requirements?.orgStatusEffects.forEach((effect) => {
                      if (!getEvilEmpire().statusEffects.includes(effect)) {
                        failed = true;
                      }
                    });
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
        <Box className="mb-4">
          <Box>
            <Box component="header">
              <Typography variant="overline">Activity Participants</Typography>
            </Box>

            <Paper>
              <DataGrid rows={activityRows} columns={activitiesColumns} />
            </Paper>
          </Box>
        </Box>
      </Box>
      {currentActivity && (
        <Dialog open={activityOpen}>
          <Box padding={"1rem"}>
            <Box component="header">
              <Typography variant="h5">
                {currentActivity.name}: Participants
              </Typography>
              <Typography variant="body2">
                ${currentActivity.costPerParticipant}/participant
              </Typography>
              <Typography variant="body2">
                {currentActivity.description}
              </Typography>
              <Typography>
                Total Cost: $
                {currentActivity.costPerParticipant * selectedAgents.length}
              </Typography>
              <Typography variant="overline">
                Select the agents participating in this activity
              </Typography>
            </Box>
            <AgentSelector
              agentsArray={actions.people.getPeople({
                organizationId:
                  GameManager.getInstance().gameData.player.organizationId,
                excludePersonnel: true,
                agentFilter: {
                  agentsOnly: true,
                },
              })}
              cb={onUpdateActivityParticipant}
            />
            <Button
              className="btn btn-primary"
              onClick={() => {
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
            >
              Close
            </Button>
          </Box>
        </Dialog>
      )}
    </>
  );
};

export default ActivitiesOverview;

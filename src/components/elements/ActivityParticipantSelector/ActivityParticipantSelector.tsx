import { Box, Typography, Button } from "@mui/material";
import { actions, GameManager } from "empire-of-evil";
import { selectEntity } from "../../../features/selectionSlice";
import AgentSelector from "../AgentSelector/AgentSelector";
import Activity from "empire-of-evil/src/activities/Activity";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

type ActivityParticipantSelectorProps = {
  currentActivity: Activity;
  onUpdateActivityParticipant: (agentId: string, selected: boolean) => void;
};
const ActivityParticipantSelector = (
  props: ActivityParticipantSelectorProps
) => {
  const { currentActivity } = props;
  const selectedAgents = useAppSelector(
    (state) => state.activityParticipantSelector.selectedAgents
  );
  const dispatch = useAppDispatch();
  return (
    <Box padding={"1rem"}>
      <Box component="header">
        <Typography variant="h5">
          {currentActivity.name}: Participants
        </Typography>
        <Typography variant="body2">
          ${currentActivity.costPerParticipant}/participant
        </Typography>
        <Typography variant="body2">{currentActivity.description}</Typography>
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
          personFilter: {
            organizationId:
              GameManager.getInstance().gameData.player.organizationId,
            excludePersonnel: true,
          },
          agentFilter: {
            agentsOnly: true,
          },
        })}
        cb={props.onUpdateActivityParticipant}
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
          //   setCurrentActivity(null);
          //   setActivityOpen(false);
          //   dispatch(setActivity(null));
          //   dispatch(setSelectedAgents([]));
        }}
      >
        Close
      </Button>
    </Box>
  );
};

export default ActivityParticipantSelector;

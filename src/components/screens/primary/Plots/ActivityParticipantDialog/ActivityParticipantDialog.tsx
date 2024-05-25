import { Dialog, Box, Typography, Button } from "@mui/material";
import actions from "empire-of-evil/src/actions";
import managers from "empire-of-evil/src/managers";
import {
  setActivity,
  setSelectedAgents,
} from "../../../../../features/ActivityParticipantSelector/ActivityParticipantSelectorSlice";
import { selectEntity } from "../../../../../features/selectionSlice";
import { ActivityConfig } from "empire-of-evil/src/managers/activities/activityConfig";
import AgentSelector from "../../../../elements/Selectors/AgentSelector/AgentSelector";
import { Person } from "empire-of-evil/src/types/interfaces/entities";
import Activity from "empire-of-evil/src/managers/activities/Activity";

type ActivityParticipantDialogProps = {
  open: boolean;
  activity: Activity;
  selectedAgents: string[];
  onSelectAgent: (agent: Person) => void;
  onClose: () => void;
};

const ActivityParticipantDialog = (props: ActivityParticipantDialogProps) => {
  const { open, activity, selectedAgents, onClose, onSelectAgent } = props;
  return (
    <Dialog open={open}>
      <Box padding={"1rem"}>
        <Box component="header">
          <Typography variant="h5">{activity.name}: Participants</Typography>
          <Typography variant="body2">
            ${activity.costPerParticipant}/participant
          </Typography>
          <Typography variant="body2">{activity.description}</Typography>
          <Typography>
            Total Cost: ${activity.costPerParticipant * selectedAgents.length}
          </Typography>
          <Typography variant="overline">
            Select the agents participating in this activity
          </Typography>
        </Box>
        <AgentSelector
          agents={actions.people.getPeople({
            personFilter: {
              organizationId:
                managers.game.GameManager.getInstance().gameData.player
                  .organizationId,
              excludePersonnel: true,
            },
            agentFilter: {
              agentsOnly: true,
            },
          })}
          onSelectAgent={onSelectAgent}
          headerText="Select Agents to Participate in Activity"
          selectedAgents={selectedAgents}
        />
        <Button
          className="btn btn-primary"
          onClick={() => {
            onClose();
          }}
        >
          Close
        </Button>
      </Box>
    </Dialog>
  );
};

export default ActivityParticipantDialog;

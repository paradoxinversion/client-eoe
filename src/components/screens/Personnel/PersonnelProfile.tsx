import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  DialogActions,
  Button,
  Typography,
  Divider,
  Tooltip,
} from "@mui/material";
import { managers, actions } from "empire-of-evil";

import AgentProfile from "../../elements/profiles/AgentProfile";
import { setPeople } from "../../../features/personSlice";
import {
  selectEntity,
  clearSelections,
} from "../../../features/selectionSlice";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { AgentDepartment } from "empire-of-evil/src/types/interfaces/entities";

const PersonnelProfile = () => {
  const dispatch = useAppDispatch();
  const [fireAgentDialogOpen, setFireAgentDialogOpen] = useState(false);
  const [department, setDepartment] = useState<null | AgentDepartment>(null);
  const selectedAgent = useAppSelector((state) => state.selections.person);
  return (
    <Box>
      <Dialog open={fireAgentDialogOpen}>
        <DialogTitle>Fire Agent</DialogTitle>
        <DialogContent>
          <Typography>
            Would you like to fire or TERMINATE this agent?
          </Typography>
          <Typography>
            Firing this agent will remove them from the Empire roster.
          </Typography>
          <Typography>
            TERMINATING this agent will remove them from their mortal coil.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setFireAgentDialogOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              const update = actions.organization.fireAgent(selectedAgent);
              const ug =
                managers.game.GameManager.getInstance().updateGameData(update);
              dispatch(clearSelections());
              dispatch(setPeople(ug.people));
              setFireAgentDialogOpen(false);
            }}
          >
            Fire
          </Button>
          <Button
            onClick={() => {
              const update = actions.organization.terminateAgent(selectedAgent);
              const ug =
                managers.game.GameManager.getInstance().updateGameData(update);
              dispatch(clearSelections());
              dispatch(setPeople(ug.people));
              setFireAgentDialogOpen(false);
            }}
          >
            Terminate
          </Button>
        </DialogActions>
      </Dialog>
      <Divider />
      <Box>
        <Button
          onClick={() => {
            dispatch(selectEntity({ type: "person", selection: null }));
          }}
        >
          Back
        </Button>
        <Button
          disabled={
            selectedAgent.id ===
              managers.game.GameManager.getInstance().gameData.player
                .overlordId || selectedAgent.isPersonnel
          }
          onClick={() => {
            setFireAgentDialogOpen(true);
          }}
        >
          Fire Agent
        </Button>
      </Box>
      <Divider />
      <AgentProfile />
    </Box>
  );
};

export default PersonnelProfile;

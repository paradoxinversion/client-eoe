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
} from "@mui/material";
import { actions, organizations } from "empire-of-evil";
import { IntegratedManagerProps } from "../..";
import AgentProfile from "../../elements/profiles/AgentProfile";
import { setPeople } from "../../features/personSlice";
import { selectEntity, clearSelections } from "../../features/selectionSlice";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const PersonnelProfile = ({ gameManager }: IntegratedManagerProps) => {
  const dispatch = useAppDispatch();
  const [changeDepartmentOpen, setChangeDepartmentOpen] = useState(false);
  const [fireAgentDialogOpen, setFireAgentDialogOpen] = useState(false);
  const [department, setDepartment] = useState(0);
  const selectedAgent = useAppSelector((state) => state.selections.person);
  return (
    <Box>
      <Dialog open={changeDepartmentOpen}>
        <DialogTitle>Change Agent Department</DialogTitle>
        <DialogContent>
          <FormControl>
            <FormLabel>Select a new department</FormLabel>
            <RadioGroup
              value={department}
              name="department-change-radio-group"
              onChange={(e) => {
                console.log(e);
                setDepartment(parseInt(e.target.value));
              }}
            >
              <FormControlLabel
                value={0}
                control={<Radio />}
                label="Henchman"
              />
              <FormControlLabel
                value={1}
                control={<Radio />}
                label="Administrator"
              />
              <FormControlLabel
                value={2}
                control={<Radio />}
                label="Scientist"
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setChangeDepartmentOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              console.log(e);
              const update = actions.people.changeAgentDepartment(
                selectedAgent,
                department
              );
              const { people } = gameManager.updateGameData(update);
              dispatch(setPeople(people));
              dispatch(
                selectEntity({
                  type: "person",
                  selection: people[selectedAgent.id],
                })
              );
              setChangeDepartmentOpen(false);
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
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
              const update = organizations.fireAgent(selectedAgent);
              const ug = gameManager.updateGameData(update);
              dispatch(clearSelections());
              dispatch(setPeople(ug.people));
              setFireAgentDialogOpen(false);
            }}
          >
            Fire
          </Button>
          <Button
            onClick={() => {
              const update = organizations.terminateAgent(selectedAgent);
              const ug = gameManager.updateGameData(update);
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
          disabled={
            selectedAgent.id === gameManager.gameData.player.overlordId ||
            selectedAgent.isPersonnel
          }
          onClick={() => {
            setChangeDepartmentOpen(true);
          }}
        >
          Change Department
        </Button>
        <Button
          disabled={
            selectedAgent.id === gameManager.gameData.player.overlordId ||
            selectedAgent.isPersonnel
          }
          onClick={() => {
            setFireAgentDialogOpen(true);
          }}
        >
          Fire Agent
        </Button>
      </Box>
      <Divider />
      <AgentProfile gameManager={gameManager} />
    </Box>
  );
};

export default PersonnelProfile;

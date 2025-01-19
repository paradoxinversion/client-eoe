import { Box, Button, Paper, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { actions } from "empire-of-evil";
import { updateGameData } from "../../../actions/dataManagement";
import { clearSelections } from "../../../features/selectionSlice";

const CaptiveProfile = () => {
  const captive = useAppSelector((state) => state.selections.person);
  const dispatch = useAppDispatch();
  return (
    <Box>
      <Typography variant="h4">{captive.name}</Typography>
      <Box padding={1}>
        <Typography variant="overline">Captive Options</Typography>
        <Paper sx={{ padding: 1 }}>
          <Button
            onClick={() => {
              updateGameData(
                actions.organization.releaseCaptive(
                  actions.organization.getEvilEmpire().id,
                  captive
                )
              );
              dispatch(clearSelections());
            }}
          >
            Release Captive
          </Button>
          <Button
            onClick={() => {
              updateGameData(actions.people.killPerson(captive));
              dispatch(clearSelections());
            }}
          >
            Kill Captive
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default CaptiveProfile;

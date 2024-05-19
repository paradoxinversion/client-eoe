import { Box, Button, Paper, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { killPerson } from "empire-of-evil/src/actions/people";
import { updateGameData } from "../../../actions/dataManagement";
import { clearSelections } from "../../../features/selectionSlice";
import { getEvilEmpire, releaseCaptive } from "empire-of-evil/src/organization";

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
              updateGameData(releaseCaptive(getEvilEmpire().id, captive));
              dispatch(clearSelections());
            }}
          >
            Release Captive
          </Button>
          <Button
            onClick={() => {
              updateGameData(killPerson(captive));
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

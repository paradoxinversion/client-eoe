import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { newGame } from "../../actions/dataManagement";
import { IntegratedManagerProps } from "../..";

const NewGameScreen = ({ gameManager }: IntegratedManagerProps) => {
  const [overlordName, setOverlordName] = useState("OVERLORD");
  const onNewGame = () => {
    newGame(gameManager);
  };
  return (
    <>
      <Box padding={"1rem"}>
        <Typography variant="h3">Welcome to your EVIL Interface</Typography>
      </Box>
      <Divider />

      <Box padding={"1rem"}>
        <Typography>
          Welcome, Overlord! Before we can authorize your session and take you
          to the Dashboard, we'll need to handle some <em>minor</em> onboarding
          items. Please complete the regristration form below.
        </Typography>
      </Box>
      <Box padding={"1rem"} component="form">
        <TextField
          name="overlordName"
          label="Overlord Name (Optional)"
          helperText="If you leave this blank, we'll just call you Overlord."
          onChange={(e) => setOverlordName(e.currentTarget.value)}
        />
        <FormControl>
          <InputLabel id="pet">pet</InputLabel>
          <Select labelId="pet" id="pet-select" value={4} label="pet">
            <MenuItem value={1}>Dog</MenuItem>
            <MenuItem value={2}>Cat</MenuItem>
            <MenuItem value={3}>Bird</MenuItem>
            <MenuItem value={4}>Exotic Cat</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Button onClick={onNewGame}>Take Control</Button>
    </>
  );
};

export default NewGameScreen;

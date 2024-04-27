import { SyntheticEvent, useState } from "react";
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
  FilledInput,
  Grid,
  Stack,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { newGame } from "../../actions/dataManagement";

import { NewGameOptions } from "empire-of-evil/src/gameSetup";

const NewGameScreen = () => {
  const [overlordFormData, setOverlordFormData] = useState({
    overlordName: "",
    pet: -1,
    codename: "",
    empireName: "",
    empireColor: "",
    takePrisoners: 1,
  });

  const onNewGame = () => {
    newGame({
      overlordName: overlordFormData.overlordName,
      pet: overlordFormData.pet > 0,
      takePrisoners: overlordFormData.takePrisoners === 1,
    });
  };

  const handleInput = (event) => {
    console.log(event.target.value);
    setOverlordFormData({
      ...overlordFormData,
      [event.target.name]: event.target.value,
    });
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
        <Typography variant="overline">
          First, let's get to know you a little better!
        </Typography>
        <Grid container spacing={"1rem"}>
          <Grid item>
            <Stack>
              <Typography variant="overline">What is your name?</Typography>
              <TextField
                name="overlordName"
                label="Overlord Name (Optional)"
                onChange={handleInput}
              />
            </Stack>
          </Grid>
          <Grid item>
            <Stack>
              <Typography variant="overline">What is your Codename?</Typography>
              <TextField
                name="codename"
                label="Codename"
                onChange={handleInput}
              />
            </Stack>
          </Grid>
          <Grid item>
            <Stack>
              <Typography variant="overline">Do you have a pet?</Typography>
              <FormControl>
                <InputLabel id="pet">pet</InputLabel>
                <Select
                  labelId="pet"
                  id="pet-select"
                  defaultValue={0}
                  label="pet"
                  name="pet"
                  sx={{ width: "120px" }}
                  onChange={handleInput}
                >
                  <MenuItem value={0}>No Pets</MenuItem>
                  <MenuItem value={1}>(House) Cat</MenuItem>
                  <MenuItem value={2}>Shark</MenuItem>
                  <MenuItem value={3}>Hawk</MenuItem>
                  <MenuItem value={4}>(Big) Cat</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Grid>
          <Grid item>
            <Stack>
              <Typography variant="overline">
                What do you want to name your EVIL Empire?
              </Typography>
              <TextField
                name="empireName"
                label="Empire Name"
                onChange={handleInput}
              />
            </Stack>
          </Grid>
          <Grid item>
            <Stack>
              <Typography variant="overline">
                What is the national color?
              </Typography>
              <FormControl>
                <InputLabel id="empire-color">National Color</InputLabel>
                <Select
                  labelId="empire-color"
                  id="empire-color-select"
                  defaultValue={0}
                  label="empire-color"
                  name="empire-color"
                  sx={{ width: "120px" }}
                >
                  <MenuItem value={0}>Red</MenuItem>
                  <MenuItem value={1}>Green</MenuItem>
                  <MenuItem value={2}>Blue</MenuItem>
                  <MenuItem value={3}>Yellow</MenuItem>
                  <MenuItem value={4}>Orange</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Grid>

          <Grid item>
            <FormControl>
              <Typography variant="overline">
                Will you be taking prisoners?
              </Typography>
              <RadioGroup
                row
                name="takePrisoners"
                value={overlordFormData.takePrisoners}
                onChange={handleInput}
              >
                <FormControlLabel value={1} control={<Radio />} label="Yes" />
                <FormControlLabel value={0} control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      <Button onClick={onNewGame}>Take Control</Button>
    </>
  );
};

export default NewGameScreen;

import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { GameManager } from "empire-of-evil";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { simActivities } from "empire-of-evil/src/sim/people";
import { selectEntity } from "../../features/selectionSlice";

const WorldPerson = () => {
  const dispatch = useAppDispatch();
  const selectedPerson = useAppSelector((state) => state.selections.person);
  const personZone = useAppSelector(
    (state) => state.zones[selectedPerson.homeZoneId]
  );

  const personNation = useAppSelector(
    (state) => state.nations[personZone.nationId]
  );

  const personActivities = useAppSelector(
    (state) => state.gameLog.simActions.people[selectedPerson.id]
  );

  return (
    <Box component="main">
      <Box component="header" padding="1rem">
        <Typography variant="h5">Surveillance Profile</Typography>
      </Box>
      <Divider />
      <Button
        onClick={() => {
          dispatch(
            selectEntity({
              type: "person",
              selection: null,
            })
          );
        }}
      >
        Back
      </Button>
      <Divider />
      <Grid container padding={"1rem"}>
        <Grid item xs={3}>
          <Typography variant="body2" color="GrayText">
            Name
          </Typography>
          <Typography variant="body2">{selectedPerson.name}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body2" color="GrayText">
            Nation
          </Typography>
          <Typography variant="body2">{personNation.name}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body2" color="GrayText">
            Home Zone
          </Typography>
          <Typography variant="body2">{personZone.name}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body2" color="GrayText">
            Intel Level
          </Typography>
          <Typography variant="body2">
            {selectedPerson.intelAttributes.intelligenceLevel > 60
              ? "High"
              : "Low"}
          </Typography>
        </Grid>
      </Grid>
      <Box padding="1rem">
        <Paper id="activities" sx={{ padding: 1 }}>
          {personActivities && (
            <>
              <Box component="header">
                <Typography variant="h6">Recent Activity</Typography>
              </Box>
              {/* <List>
                {personActivities.map((activity) => (
                  <ListItem>
                    <ListItemText primary={simActivities[activity].text} />
                  </ListItem>
                ))}
              </List> */}
              <Box>
                {personActivities.map((activity) => (
                  <Typography>{simActivities[activity].text} </Typography>
                ))}
              </Box>
            </>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default WorldPerson;

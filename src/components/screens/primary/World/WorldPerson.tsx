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
import { useAppDispatch } from "../../../../app/hooks";

import { sim } from "empire-of-evil";
import { selectEntity } from "../../../../features/selectionSlice";
import {
  Nation,
  Person,
  Zone,
} from "empire-of-evil/src/types/interfaces/entities";
type WorldPersonProps = {
  selectedPerson: Person;
  homeZone: Zone;
  nativeNation: Nation;
  activities: string[];
};
const WorldPerson = ({
  selectedPerson,
  homeZone,
  nativeNation,
  activities,
}: WorldPersonProps) => {
  const dispatch = useAppDispatch();
  const intelCategory =
    selectedPerson.intelAttributes.intelligenceLevel > 60 ? "High" : "Low";
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
      <Box padding="1rem">
        <Typography variant="h4">{selectedPerson.name}</Typography>
        <Typography>Citizen of {nativeNation.name}</Typography>
        <Typography>Resident of {homeZone.name}</Typography>
      </Box>
      <Box padding="1rem">
        {intelCategory === "High" ? (
          <Typography>
            We have been surveilling this person for some time now.
          </Typography>
        ) : (
          <Typography>
            We have a low amount of surveillance data on this individual.
          </Typography>
        )}
      </Box>
      {intelCategory === "High" && (
        <Box padding="1rem">
          <Paper id="activities" sx={{ padding: 1 }}>
            {activities && (
              <>
                <Box component="header">
                  <Typography variant="h6">Recent Activity</Typography>
                </Box>
                <Box>
                  {activities.map((activity) => (
                    <Typography>
                      {sim.people.simActivities[activity].text}{" "}
                    </Typography>
                  ))}
                </Box>
              </>
            )}
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default WorldPerson;

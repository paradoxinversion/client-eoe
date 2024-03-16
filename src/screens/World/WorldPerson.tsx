import { Box, Card, Divider, Typography } from "@mui/material";
import { GameManager } from "empire-of-evil";
import { useAppSelector } from "../../app/hooks";
import { IntegratedManagerProps } from "../..";
import { simActivities } from "empire-of-evil/src/sim/people";

const WorldPerson = ({ gameManager }: IntegratedManagerProps) => {
  const selectedPerson = useAppSelector((state) => state.selections.person);
  const personZone = useAppSelector(
    (state) => state.zones[selectedPerson.homeZoneId]
  );
  const personNation = useAppSelector(
    (state) => state.nations[personZone.nationId]
  );
  const simActivitiesDef = simActivities;
  return (
    <Box component="main">
      <Box component="header" padding="1rem">
        <Typography variant="h5">Surveillance Profile</Typography>
      </Box>
      <Box id="profile" padding="1rem">
        <Box id="basic-information">
          <Typography>{selectedPerson.name}</Typography>
          <Typography>Nationality: {personNation.name}</Typography>
          <Typography>Home Zone: {personZone.name}</Typography>
          <Typography>
            Intelligence Level:{" "}
            {selectedPerson.intelAttributes.intelligenceLevel > 60
              ? "High"
              : "Low"}
          </Typography>
        </Box>
      </Box>
      <Box id="activities" padding="1rem">
        <Box component="header">
          <Typography variant="h6">Recent Activity</Typography>
        </Box>
        <Box sx={{ height: "10rem" }}>
          <Card>
            <Box sx={{ paddingY: "0.5rem", paddingX: "1rem" }}>
              <Typography>Activity</Typography>
            </Box>
            <Divider />
            <Box sx={{ paddingY: "0.5rem", paddingX: "1rem" }}>
              <Typography>Activity</Typography>
            </Box>
            <Divider />
            <Box sx={{ paddingY: "0.5rem", paddingX: "1rem" }}>
              <Typography>Activity</Typography>
            </Box>
            <Divider />
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default WorldPerson;

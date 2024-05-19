import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { GameManager } from "empire-of-evil";
import { getBuildings } from "empire-of-evil/src/buildings";
import { useAppSelector } from "../../../app/hooks";
import { SCIENCE_PROJECTS } from "empire-of-evil/src/managers/science/scienceProjects";
import { ScienceManager } from "empire-of-evil/src/managers/science/science";

const ScienceOverview = () => {
  const activeProjects = useAppSelector(
    (state) => state.science.activeProjects
  );
  return (
    <>
      <Box component="header">
        <Typography>Laboratories</Typography>
        <Grid container>
          {getBuildings({
            type: "laboratory",
            organizationId:
              GameManager.getInstance().gameData.player.organizationId,
          }).map((lab) => {
            const project = activeProjects.find(
              (project) => project.laboratory === lab.id
            );
            return (
              <Grid item>
                <Card sx={{ padding: 1 }}>
                  <CardHeader
                    title={lab.name}
                    titleTypographyProps={{ variant: "body1" }}
                    subheader={
                      GameManager.getInstance().gameData.zones[lab.zoneId].name
                    }
                    subheaderTypographyProps={{ variant: "body2" }}
                  />

                  <Divider />
                  <CardContent>
                    <Typography variant="body2">
                      Staff: {lab.personnel.length}/
                      {lab.basicAttributes.maxPersonnel}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Researching</strong>{" "}
                    </Typography>
                    <Typography variant="body2">
                      {SCIENCE_PROJECTS[project?.indexName]?.name ||
                        "No Project"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        {ScienceManager.getInstance().completedProjects.map((project) => {
          return (
            <Typography key={project}>
              {SCIENCE_PROJECTS[project].name} completed
            </Typography>
          );
        })}
      </Box>
    </>
  );
};

export default ScienceOverview;

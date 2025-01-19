import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { managers, actions } from "empire-of-evil";
import { useAppSelector } from "../../../../app/hooks";
import { ScienceProjectStatus } from "empire-of-evil/types";
type ScienceOverviewProps = {
  activeProjects: ScienceProjectStatus[];
};
const ScienceOverview = ({ activeProjects }: ScienceOverviewProps) => {
  return (
    <>
      <Box component="header">
        <Typography>Laboratories</Typography>
        <Grid container>
          {actions.buildings
            .getBuildings({
              type: "laboratory",
              organizationId:
                managers.game.GameManager.getInstance().gameData.player
                  .organizationId,
            })
            .map((lab) => {
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
                        managers.game.GameManager.getInstance().gameData.zones[
                          lab.zoneId
                        ].name
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
                      {project ? (
                        <Typography variant="body2">
                          {
                            managers.science.projectConfig[project?.indexName]
                              .name
                          }
                        </Typography>
                      ) : (
                        <Typography variant="body2">No Project</Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
        {managers.science.ScienceManager.getInstance().completedProjects.map(
          (project) => {
            return (
              <Typography key={project}>
                {managers.science.projects[project].name} completed
              </Typography>
            );
          }
        )}
      </Box>
    </>
  );
};

export default ScienceOverview;

import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  LinearProgress,
  Tooltip,
  Typography,
} from "@mui/material";
import { useAppDispatch } from "../../../../app/hooks";
import { managers } from "empire-of-evil";
import {
  ScienceProject,
  ScienceProjectStatus,
} from "empire-of-evil/src/managers/science/types";
import { setProjects } from "../../../../features/scienceSlice";

type ScienceProgressProps = {
  activeProjects: ScienceProjectStatus[];
};

const ScienceProgress = ({ activeProjects }: ScienceProgressProps) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <Box component="header">
        <Typography>
          Progress on science projects can be viewed in the table below.
        </Typography>
        <Grid container>
          {activeProjects.map((project) => {
            console.log(project);
            return (
              <Grid item key={project.indexName}>
                <Card>
                  <CardContent>
                    <Typography variant="body2">
                      {managers.science.projects[project.indexName].name}
                    </Typography>

                    <Typography variant="body2">
                      <strong>Research Lab</strong>
                    </Typography>
                    <Typography variant="body2">
                      {
                        managers.game.GameManager.getInstance().gameData
                          .buildings[project.laboratory].name
                      }
                    </Typography>
                    <Typography variant="body2">
                      <strong>Progress</strong>
                    </Typography>
                    <Typography variant="body2">
                      Science Goal:{" "}
                      {managers.science.projects[project.indexName].science}{" "}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={
                        (project.accumulatedScience /
                          managers.science.projects[project.indexName]
                            .science) *
                        100
                      }
                    />
                  </CardContent>
                  <CardActions>
                    <Tooltip title="Cancel Project; All science will be lost.">
                      <Button
                        onClick={() => {
                          managers.science.ScienceManager.getInstance().cancelProject(
                            project.indexName as ScienceProject
                          );
                          dispatch(
                            setProjects(
                              managers.science.ScienceManager.getInstance()
                                .activeProjects
                            )
                          );
                        }}
                      >
                        Cancel Project
                      </Button>
                    </Tooltip>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export default ScienceProgress;

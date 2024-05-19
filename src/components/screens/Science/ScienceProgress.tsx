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
import ScienceProgressDataGrid from "../../dataGrids/scienceProgressDataGrid";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { SCIENCE_PROJECTS } from "empire-of-evil/src/managers/science/scienceProjects";
import { GameManager } from "empire-of-evil";
import { ScienceManager } from "empire-of-evil/src/managers/science/science";
import { ScienceProject } from "empire-of-evil/src/managers/science/types";
import { setProjects } from "../../../features/scienceSlice";

const ScienceProgress = () => {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.science.activeProjects);
  return (
    <>
      <Box component="header">
        <Typography>
          Progress on science projects can be viewed in the table below.
        </Typography>
        <Grid container>
          {projects.map((project) => {
            console.log(project);
            return (
              <Grid item key={project.indexName}>
                <Card>
                  <CardContent>
                    <Typography variant="body2">
                      {SCIENCE_PROJECTS[project.indexName].name}
                    </Typography>

                    <Typography variant="body2">
                      <strong>Research Lab</strong>
                    </Typography>
                    <Typography variant="body2">
                      {
                        GameManager.getInstance().gameData.buildings[
                          project.laboratory
                        ].name
                      }
                    </Typography>
                    <Typography variant="body2">
                      <strong>Progress</strong>
                    </Typography>
                    <Typography variant="body2">
                      Science Goal:{" "}
                      {SCIENCE_PROJECTS[project.indexName].science}{" "}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={
                        (project.accumulatedScience /
                          SCIENCE_PROJECTS[project.indexName].science) *
                        100
                      }
                    />
                  </CardContent>
                  <CardActions>
                    <Tooltip title="Cancel Project; All science will be lost.">
                      <Button
                        onClick={() => {
                          ScienceManager.getInstance().cancelProject(
                            project.indexName as ScienceProject
                          );
                          dispatch(
                            setProjects(
                              ScienceManager.getInstance().activeProjects
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

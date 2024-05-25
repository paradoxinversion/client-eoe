import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  HourglassFull as HourglassFullIcon,
  Check as CheckIcon,
  Science as ScienceIcon,
  Money as MoneyIcon,
} from "@mui/icons-material";
import { managers, actions } from "empire-of-evil";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { setProjects } from "../../../../features/scienceSlice";
import {
  ScienceProject,
  ScienceProjectStatus,
} from "empire-of-evil/src/managers/science/types";
import { useState } from "react";

type ScienceProjectsProps = {
  activeProjects: ScienceProjectStatus[];
};
const ScienceProjects = ({ activeProjects }: ScienceProjectsProps) => {
  const dispatch = useAppDispatch();
  const [selectLabOpen, setSelectLabOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ScienceProject>();
  const [lab, setLab] = useState("");

  return (
    <>
      <Dialog open={selectLabOpen}>
        <DialogContent>
          <Typography>Select a lab to start research</Typography>
          <Typography>
            This lab must be staffed by scientists to begin the project.
            Scientists must work in the lab to complete the project.
          </Typography>
          <List>
            {actions.buildings
              .getBuildings({
                type: "laboratory",
                organizationId:
                  managers.game.GameManager.getInstance().gameData.player
                    .organizationId,
              })
              .map((lab) => {
                return (
                  <>
                    <ListItem
                      secondaryAction={
                        <Tooltip title="Select Laboratory">
                          <IconButton
                            disabled={lab.personnel.length === 0}
                            edge="end"
                            aria-label="select-laboratory"
                            size="small"
                            onClick={() => {
                              if (selectedProject && lab) {
                                setLab(lab.id);
                                setSelectLabOpen(false);
                                managers.science.ScienceManager.getInstance().startProject(
                                  selectedProject,
                                  lab.id
                                );
                                dispatch(
                                  setProjects(
                                    managers.science.ScienceManager.getInstance()
                                      .activeProjects
                                  )
                                );
                              }
                            }}
                          >
                            <CheckIcon />
                          </IconButton>
                        </Tooltip>
                      }
                    >
                      <Grid
                        container
                        direction="row"
                        spacing="1rem"
                        columns={2}
                      >
                        <Grid item xs={1}>
                          <Typography>{lab.name}</Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <Typography
                            color={lab.personnel.length === 0 ? "red" : "green"}
                          >
                            Staff: {lab.personnel.length}/
                            {lab.basicAttributes.maxPersonnel}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <Divider />
                  </>
                );
              })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectLabOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Typography>
        Science projects available for research can be selected below. Some
        projects may require other projects to be completed before they can be
        started.
      </Typography>
      <Grid container spacing="1rem" padding="1rem">
        {Object.values(
          managers.science.ScienceManager.getInstance().PROJECT_DEFINITIONS
        )
          .filter((project) => {
            const requirements = project.requirements;

            if (requirements.completedProjects.length > 0) {
              // Ensure all required projects are completed
              const { completedProjects } =
                managers.science.ScienceManager.getInstance();
              const projectsCompleted = requirements.completedProjects.every(
                (requiredProject) => {
                  return completedProjects.find((cp) => cp === requiredProject);
                }
              );
              if (!projectsCompleted) {
                return false;
              }
            }

            if (
              managers.science.ScienceManager.getInstance().completedProjects.includes(
                project.indexName as ScienceProject
              )
            ) {
              return false;
            }
            // filter out projects that are already in progress
            return !activeProjects.find((proj) => proj === project.indexName);
          })
          .map((project) => {
            return (
              <Grid item key={project.name} xs={6}>
                <Card variant="outlined">
                  <CardHeader
                    title={<strong>{project.name}</strong>}
                    titleTypographyProps={{ variant: "body1" }}
                  />
                  <Divider />
                  <CardContent>
                    <Grid container spacing={1} sx={{ paddingBottom: "1rem" }}>
                      <Grid item>
                        <Stack direction="row" spacing={1}>
                          <ScienceIcon />
                          <Typography>{project.science}</Typography>
                        </Stack>
                      </Grid>
                      <Grid item>
                        <Stack direction="row" spacing={1}>
                          <HourglassFullIcon />
                          <Typography>{project.completionTime}</Typography>
                        </Stack>
                      </Grid>
                      <Grid item sx={{ alignItems: "center" }}>
                        <Stack direction="row" spacing={1}>
                          <MoneyIcon />
                          <Typography>{project.cost}</Typography>
                        </Stack>
                      </Grid>
                    </Grid>

                    <Divider />
                    <Box
                      sx={{
                        paddingTop: "1rem",
                        maxHeight: "250px",
                        overflow: "scroll",
                      }}
                    >
                      <Typography>{project.description}</Typography>
                    </Box>
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Button
                      disabled={
                        actions.organization.getEvilEmpire().wealth <
                        project.cost
                      }
                      onClick={() => {
                        setSelectLabOpen(true);
                        setSelectedProject(project.indexName as ScienceProject);
                      }}
                    >
                      Start Research
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </>
  );
};

export default ScienceProjects;

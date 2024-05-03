import {
  Box,
  Button,
  Card,
  CardActionArea,
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
} from "@mui/icons-material";
import { GameManager } from "empire-of-evil";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setProjects } from "../../features/scienceSlice";
import { ScienceProject } from "empire-of-evil/src/managers/science/types";
import { useState } from "react";
import { getBuildings } from "empire-of-evil/src/buildings";
import { getEvilEmpire } from "empire-of-evil/src/organization";

const ScienceProjects = () => {
  const dispatch = useAppDispatch();
  const [selectLabOpen, setSelectLabOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ScienceProject>();
  const [lab, setLab] = useState("");
  const currentProjects = useAppSelector(
    (state) => state.science.activeProjects
  );
  return (
    <>
      <Dialog open={selectLabOpen}>
        <DialogContent>
          <Typography>Select a lab to start research</Typography>
          <Typography>
            This lab should be staffed by scientists for progress to occur on
            the project.
          </Typography>
          <List>
            {getBuildings({
              type: "laboratory",
              organizationId:
                GameManager.getInstance().gameData.player.organizationId,
            }).map((lab) => {
              return (
                <>
                  <ListItem
                    secondaryAction={
                      <Tooltip title="Select Laboratory">
                        <IconButton
                          edge="end"
                          aria-label="select-laboratory"
                          size="small"
                          onClick={() => {
                            setLab(lab.id);
                            setSelectLabOpen(false);
                            GameManager.getInstance().scienceManager.startProject(
                              selectedProject,
                              lab.id
                            );
                            dispatch(
                              setProjects(
                                GameManager.getInstance().scienceManager
                                  .activeProjects
                              )
                            );
                          }}
                        >
                          <CheckIcon />
                        </IconButton>
                      </Tooltip>
                    }
                  >
                    <Grid container direction="row" spacing="1rem" columns={2}>
                      <Grid item xs={1}>
                        <Typography>{lab.name}</Typography>
                      </Grid>
                      <Grid item xs={1}>
                        <Typography>
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
          GameManager.getInstance().scienceManager.PROJECT_DEFINITIONS
        )
          .filter((project) => {
            const requirements = project.requirements;

            if (requirements.completedProjects.length > 0) {
              // Ensure all required projects are completed
              const { completedProjects } =
                GameManager.getInstance().scienceManager;
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
              GameManager.getInstance().scienceManager.completedProjects.includes(
                project.indexName as ScienceProject
              )
            ) {
              return false;
            }
            // filter out projects that are already in progress
            return !currentProjects.find(
              (ap) => ap.indexName === project.indexName
            );
          })
          .map((project) => {
            return (
              <Grid item key={project.name} xs={6}>
                <Card variant="outlined">
                  <CardHeader title={project.name} />
                  <Divider />
                  <CardContent>
                    <Stack paddingBottom={"0.5rem"}>
                      <Typography variant="body2">
                        Science Goal: {project.science}
                      </Typography>
                      <Typography variant="body2">
                        Completion Time: {project.completionTime}
                      </Typography>
                      <Typography variant="body2">
                        Starting Cost: ${project.cost}
                      </Typography>
                    </Stack>
                    <Divider />
                    <Box sx={{ maxHeight: "250px", overflow: "scroll" }}>
                      <Typography>{project.description}</Typography>
                    </Box>
                  </CardContent>
                  <Divider />
                  <CardActionArea>
                    <Button
                      disabled={getEvilEmpire().wealth < project.cost}
                      onClick={() => {
                        setSelectLabOpen(true);
                        setSelectedProject(project.indexName as ScienceProject);
                      }}
                    >
                      Start Research
                    </Button>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </>
  );
};

export default ScienceProjects;

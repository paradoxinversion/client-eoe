import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { HourglassFull as HourglassFullIcon } from "@mui/icons-material";
import { GameManager } from "empire-of-evil";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setProjects } from "../../features/scienceSlice";

interface ScienceProjectProps {
  gameManager: GameManager;
}
const ScienceProjects = ({ gameManager }: ScienceProjectProps) => {
  const dispatch = useAppDispatch();
  const currentProjects = useAppSelector(
    (state) => state.science.activeProjects
  );
  return (
    <>
      <Grid container spacing="1rem" padding="1rem" columns={9}>
        {Object.values(gameManager.scienceManager.PROJECTS)
          .filter((project) => {
            return !currentProjects.find(
              (ap) => ap.indexName === project.indexName
            );
          })
          .map((project) => {
            return (
              <Grid item xs={3} key={project.name}>
                <Card variant="outlined">
                  <CardHeader title={project.name} />
                  <Divider />
                  <CardContent>
                    <Stack paddingBottom={"0.5rem"} direction="row">
                      <HourglassFullIcon />
                      <Typography>{project.completionTime}</Typography>
                    </Stack>
                    <Divider />
                    <Box sx={{ maxHeight: "250px", overflow: "scroll" }}>
                      <Typography>{project.description}</Typography>
                    </Box>
                  </CardContent>
                  <Divider />
                  <CardActionArea>
                    <Button
                      onClick={() => {
                        gameManager.scienceManager.startProject(
                          gameManager,
                          project.indexName
                        );
                        dispatch(
                          setProjects(gameManager.scienceManager.activeProjects)
                        );
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

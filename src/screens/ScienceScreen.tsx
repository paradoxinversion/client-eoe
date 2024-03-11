import { addPersonnel, getOrgLabs } from "empire-of-evil/src/buildings";
import { getAgentsInZone, _getAgents } from "empire-of-evil/src/organization";
import { useState } from "react";
import { toDataArray } from "../utilities/dataHelpers";
import MetricCard from "../elements/MetricCard/MetricCard";
import DataGrid from "react-data-grid";
import {
  Box,
  Button,
  Divider,
  Stack,
  Paper,
  Toolbar,
  Typography,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  Chip,
  DialogActions,
} from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import MetricNumber from "../elements/MetricNumber/MetricNumber";
import { dataGridButton } from "../datagridRenderers/dataGridButton";
import PersonDataGrid from "../dataGrids/personDataGrid";
import { setPeople } from "../features/personSlice";
import { setBuildings } from "../features/buildingSlice";
import { useDispatch } from "react-redux";
import { getPeople } from "empire-of-evil/src/actions/people";
import { GameManager } from "empire-of-evil";
import { useAppDispatch } from "../app/hooks";
import { Building } from "empire-of-evil/src/types/interfaces/entities";
const columns = [
  { key: "lab", name: "Lab" },
  { key: "maxScientists", name: "Max Scientists" },
  { key: "selectLab", name: "View Laboratory", renderCell: dataGridButton },
];
interface ScienceScreenProps {
  gameManager: GameManager;

}

const ScienceScreen = ({ gameManager }: ScienceScreenProps) => {
  const dispatch = useAppDispatch();
  const [personnelDialogOpen, setPersonnelDialogOpen] = useState(false);
  const { gameData } = gameManager;
  const [selectedLab, setSelectedLab] = useState<Building>(null);
  const labs = getOrgLabs(gameManager, gameData.player.organizationId);
  const rows = labs.map((lab) => ({
    lab: lab.name,
    maxScientists: lab.maxPersonnel,
    selectLab: () => {
      setSelectedLab(lab);
    },
  }));
  return (
    <Box component="main">
      <Toolbar />
      <Box component="section">
        <Box component="header" padding="1rem">
          <Typography variant="h3">Science</Typography>
        </Box>

        <Divider />

        <Box padding="1rem" component={"section"}>
          <Stack direction="row" spacing={"1rem"} justifyContent={"center"}>
            <MetricNumber title="Total Labs" number={labs.length} />
            <MetricNumber title="Scientists" number={9999} />
          </Stack>
        </Box>

        <Divider />
        {selectedLab ? (
          <Box component="section">
            <Box padding={"1rem"} component="header">
              <Typography variant="h5">{selectedLab.name}</Typography>
            </Box>
            <Divider />
            <Stack direction="row" spacing={1} padding={1}>
              <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => {
                  setSelectedLab(null);
                }}
              >
                Back
              </Button>
              <Button
                onClick={() => {
                  setPersonnelDialogOpen(true);
                }}
              >
                Add Personnel
              </Button>
            </Stack>
            <Divider />
            <Box padding={"1rem"}>
              <PersonDataGrid
                gameManager={gameManager}
                people={selectedLab.personnel.map(
                  (personId) => gameManager.gameData.people[personId]
                )}
                title="Personnel"
              />
            </Box>
            {selectedLab.personnel.map((labPersonnel) => {
              return (
                <Box>
                  <Typography>{gameData.people[labPersonnel].name}</Typography>
                </Box>
              );
            })}
          </Box>
        ) : (
          <Grid container padding="1rem" columns={10}>
            <Grid item xs={10}>
              <Typography variant="overline">EVIL Laboratories</Typography>
              <Paper>
                <DataGrid columns={columns} rows={rows} />
              </Paper>
            </Grid>
          </Grid>
        )}
      </Box>
      <Dialog open={personnelDialogOpen}>
        <DialogTitle>Add Personnel</DialogTitle>
        <DialogContent>
          <Typography>
            Select the Agent(s) you would like to work in this Laboratory.
          </Typography>
          <Stack direction="row" spacing={1} padding={1}>
            {getPeople(gameManager, {
              // organizationId: gameData.player.organizationId,
              nationId: gameData.player.empireId,
              excludePersonnel: true,
              // zoneId: selectedLab?.zoneId,
              agentFilter: {
                department: 2,
                agentsOnly: true
              }
            }).map((agent) => {
              return (
                <Chip
                  label={agent.name}
                  onClick={() => {
                    const updatedGameData = addPersonnel(agent, selectedLab);
                    gameManager.updateGameData(updatedGameData);
                    // updateGameData(updatedGameData);
                    dispatch(setPeople(gameManager.gameData.people));
                    dispatch(setBuildings(gameManager.gameData.buildings))
                    setPersonnelDialogOpen(false);
                  }}
                />
              );
            })}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setPersonnelDialogOpen(false)}}>Done</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ScienceScreen;

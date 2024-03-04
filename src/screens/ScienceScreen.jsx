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
} from "@mui/material";
import MetricNumber from "../elements/MetricNumber/MetricNumber";
const columns = [
  { key: "lab", name: "Lab" },
  { key: "maxScientists", name: "Max Scientists" },
];
/**
 *
 * @param {Object} props
 * @param {import("empire-of-evil/src/typedef").GameData} props.gameData
 * @returns
 */
const ScienceScreen = ({ gameManager, updateGameData }) => {
  const { gameData } = gameManager;
  const [selectedLab, setSelectedLab] = useState(null);
  const [addingPersonnel, setAddingPersonnel] = useState(false);
  const labs = getOrgLabs(gameManager, gameData.player.organizationId);
  const rows = labs.map((lab) => ({
    lab: lab.name,
    maxScientists: lab.maxPersonnel,
  }));
  return (
    <Box copmponent="main">
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
        <Grid container padding="1rem" columns={10}>
          <Grid item xs={10}>
            <Typography variant="overline">EVIL Laboratories</Typography>
            <Paper>
              <DataGrid columns={columns} rows={rows} />
            </Paper>
          </Grid>
        </Grid>

        <Box padding="1rem">
          {selectedLab && (
            <Box component="section">
              <Box component="header">
                <Typography>{selectedLab.name}</Typography>
              </Box>
              <Typography>Personnel</Typography>
              {selectedLab.personnel.map((labPersonnel) => {
                return (
                  <Box>
                    <Typography>
                      {gameData.people[labPersonnel].name}
                    </Typography>
                  </Box>
                );
              })}
              <Button
                onClick={() => {
                  setAddingPersonnel(true);
                }}
              >
                Add Personnel
              </Button>
            </Box>
          )}
        </Box>
      </Box>
      {addingPersonnel && (
        <Box>
          {_getAgents(gameManager, {
            organizationId: gameData.player.organizationId,
            filter: {
              zoneId: selectedLab.zoneId,
              department: 2,
            },
            exclude: {
              personnel: true,
            },
          }).map((agent) => {
            return (
              <Button
                onClick={() => {
                  const updatedGameData = addPersonnel(agent, selectedLab);

                  updateGameData(updatedGameData);
                  setAddingPersonnel(false);
                }}
              >
                {agent.name}
              </Button>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default ScienceScreen;

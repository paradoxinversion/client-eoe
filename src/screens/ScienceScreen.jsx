import { addPersonnel, getOrgLabs } from "empire-of-evil/src/buildings";
import { getAgentsInZone, _getAgents } from "empire-of-evil/src/organization";
import { useState } from "react";
import { toDataArray } from "../utilities/dataHelpers";
import MetricCard from "../elements/MetricCard/MetricCard";
import DataGrid from 'react-data-grid';
import {Box, Button, Toolbar, Typography} from '@mui/material';
const columns = [
  { key: 'lab', name: 'Lab' },
  { key: 'maxScientists', name: 'Max Scientists' },
];
/**
 *
 * @param {Object} props
 * @param {import("empire-of-evil/src/typedef").GameData} props.gameData
 * @returns
 */
const ScienceScreen = ({ gameManager, updateGameData }) => {
  const {gameData} = gameManager;
  const [selectedLab, setSelectedLab] = useState(null);
  const [addingPersonnel, setAddingPersonnel] = useState(false);
  const labs = getOrgLabs(gameManager, gameData.player.organizationId);
  const rows = labs.map((lab) =>({
    lab: lab.name,
    maxScientists: lab.maxPersonnel
  }))
  return (
    <Box copmponent='main'> 
      <Toolbar />

      <Box component='section' >

        <Box component='header'>
          <Typography>Science</Typography>
        </Box>
        <Box>
          <Box component={'section'}>
            <Box component='header'>
              <Typography>Labs</Typography>
            </Box>
            <Box>
              <MetricCard title="Total Labs">
                {labs.length}
              </MetricCard>
            </Box>
            <DataGrid columns={columns} rows={rows} />
          </Box>

          {selectedLab && (
            <Box component='section'>
              <Box component='header' >
                <Typography>{selectedLab.name}</Typography>
              </Box>
              <Typography>Personnel</Typography>
              {selectedLab.personnel.map((labPersonnel) => {
                return (
                  <Box>
                    <Typography>{gameData.people[labPersonnel].name}</Typography>
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
          {_getAgents(
            gameManager,
            {
              organizationId: gameData.player.organizationId,
              filter: {
                zoneId: selectedLab.zoneId,
                department: 2
              },
              exclude: {
                personnel: true
              }
            }
          )
            .map((agent) => {
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

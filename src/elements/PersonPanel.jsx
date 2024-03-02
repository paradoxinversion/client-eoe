import { getAgentSubordinates } from "empire-of-evil/src/organization";
import { toDataArray } from "../utilities/dataHelpers";
import { GameManager } from "empire-of-evil";
import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';
import { Box, Card, CardContent, Typography } from "@mui/material";

const columns = [
  { key: 'name', name: 'Name' },
  { key: 'health', name: 'Health' },
  { key: 'department', name: 'Department' },
  { key: 'leadership', name: 'Leadership' },
  { key: 'location', name: 'Location' },
];
const PersonPanel = ({ gameManager, title, people, cb }) => {
  const {gameData} = gameManager;

  const rows = people.map((person, index) => {
    return {
      name: person.name,
      health: `${person.currentHealth}/${person.health}`,
      department: person.agent.department,
      leadership: `${getAgentSubordinates(gameManager, person).length}/${person.leadership}`,
      location: gameData?.zones[person.homeZoneId]?.name
    }
  });

  return (
    <Box>
      <Typography>{title}</Typography>
      <Box>
        <DataGrid columns={columns} rows={rows} />
      </Box>
    </Box>
  );
};

export default PersonPanel;

import { getAgentSubordinates } from "empire-of-evil/src/organization";
import { toDataArray } from "../utilities/dataHelpers";
import { GameManager } from "empire-of-evil";
import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';
import { Box, Card, CardContent, Typography } from "@mui/material";
import { dataGridButton } from "../datagridRenderers/dataGridButton";

const columns = [
  { key: 'name', name: 'Name' },
  { key: 'health', name: 'Health' },
  { key: 'department', name: 'Department' },
  { key: 'leadership', name: 'Leadership' },
  { key: 'location', name: 'Location' },
  { key: 'select', renderCell: dataGridButton, name: 'Select' },
];

const departments = [
  'Henchman',
  'Administrator',
  'Scientist',
  'Overlord'
]
const PersonPanel = ({ gameManager, title, people, cb }) => {
  const {gameData} = gameManager;

  const rows = people.map((person, index) => {
    return {
      name: person.name,
      health: `${person.currentHealth}/${person.health}`,
      department: departments[person.agent?.department] || 'Citizen',
      leadership: `${getAgentSubordinates(gameManager, person).length}/${person.leadership}`,
      location: gameData?.zones[person.homeZoneId]?.name,
      cb: cb,
      id: person.id
    }
  });

  return (
    <Box>
      <Typography variant="overline">{title}</Typography>
      <Box>
        <DataGrid columns={columns} rows={rows} />
      </Box>
    </Box>
  );
};

export default PersonPanel;

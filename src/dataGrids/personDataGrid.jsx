import { Box, Paper, Typography } from "@mui/material";
import { Check as CheckIcon, Close as CloseIcon } from "@mui/icons-material"
import DataGrid from "react-data-grid";

const personDataGridColumns = [
  { key: "name", name: "Name" },
  { key: "zone", name: "Zone" },
  { key: "loyalty", name: "Loyalty" },
  { key: "intelLevel", name: "Intelligence" },
  { key: "agent", name: "Agent?" },
  { key: "select", name: "" },
];

const PersonDataGrid = ({ title, people, gameManager }) => {
  const { gameData } = gameManager;
  const personDataGridRows = people.map((person) => {
    const { name: zoneName } = gameData.zones[person.homeZoneId];
    const { name, loyalty, intelligenceLevel, agent } = person;
    return {
      zone: zoneName,
      name,
      loyalty,
      intelLevel: intelligenceLevel,
      agent: !!agent ? <CheckIcon /> : <CloseIcon />,
      select: () => {},
    };
  });

  return (
    <Box component="section">
      <Box component="header">
        <Typography variant="overline">{title}</Typography>
      </Box>
      <Paper>

        <DataGrid rows={personDataGridRows} columns={personDataGridColumns} />
      </Paper>
    </Box>
  );
};

export default PersonDataGrid;

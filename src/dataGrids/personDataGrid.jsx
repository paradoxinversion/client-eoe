import { numberWithErrorMargin } from "empire-of-evil/src/utilities";
import { getZoneCitizens } from "empire-of-evil/src/zones";
import { toDataArray } from "../utilities/dataHelpers";
import { GameManager } from "empire-of-evil";
import { Box, Card, CardContent, Paper, Typography } from "@mui/material";
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
      agent: !!agent ? "Y" : "N",
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

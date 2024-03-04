import { numberWithErrorMargin } from "empire-of-evil/src/utilities";
import { getZoneCitizens } from "empire-of-evil/src/zones";
import { toDataArray } from "../utilities/dataHelpers";
import { GameManager } from "empire-of-evil";
import { Box, Card, CardContent, Typography, Paper } from "@mui/material";
import DataGrid from 'react-data-grid';

const buildingDataGridColumns = [
  {key: "zone", name: "Zone"},
  {key: "name", name: "Name"},
  {key: "upkeep", name: "Upkeep"},
  {key: "type", name: "Type"},
  {key: "maxPersonnel", name: "Max Personnel"},
  {key: "select", name: ''}
];

const BuildingDataGrid = ({ title, buildings, gameManager }) => {
  const {gameData} = gameManager;
  const buildingDataGridRows = buildings.map((building) => {
    const {name: zoneName} = gameData.zones[building.zoneId];
    const { name, upkeepCost, type, maxPersonnel } = building;
    return {
      zone: zoneName,
      name,
      upkeep: upkeepCost,
      type,
      maxPersonnel,
      select: () => {}

  }})

  return (
    <Box component={"section"}>
      <Box component={"header"}>
        <Typography variant="overline">{title}</Typography>
      </Box>
      <Paper>
        <DataGrid rows={buildingDataGridRows} columns={buildingDataGridColumns} />
      </Paper>
    </Box>
  );
};

export default BuildingDataGrid;

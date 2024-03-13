import { Box, Typography, Paper } from "@mui/material";
import DataGrid from "react-data-grid";
import { dataGridButton } from "../datagridRenderers/dataGridButton";

const buildingDataGridColumns = [
  { key: "name", name: "Name" },
  { key: "type", name: "Type" },
  { key: "zone", name: "Zone" },
  { key: "upkeep", name: "Upkeep/mo" },
  { key: "personnel", name: "Personnel" },
  { key: "housingCapacity", name: "Housing" },
  { key: "wealthBonus", name: "Wealth" },
  { key: "cb", name: "Select", renderCell: dataGridButton },
];

const BuildingDataGrid = ({
  title,
  buildings,
  gameManager,
  gridHeight,
  cb,
}) => {
  const { gameData } = gameManager;
  const buildingDataGridRows = buildings.map((building) => {
    const { name: zoneName } = gameData.zones[building.zoneId];
    const { id, name, type, personnel } = building;
    const { housingCapacity, wealthBonus } = building.resourceAttributes;
    const { upkeepCost, maxPersonnel } = building.basicAttributes;
    return {
      id,
      zone: zoneName,
      name,
      upkeep: `$${upkeepCost}`,
      type,
      personnel: `${personnel.length}/${maxPersonnel}`,
      housingCapacity,
      wealthBonus,
      cb: (b) => {
        console.log("foo");
        cb && cb(b);
      },
    };
  });

  return (
    <Box component={"section"}>
      <Box component={"header"}>
        <Typography variant="overline">{title}</Typography>
      </Box>
      <Paper>
        <DataGrid
          style={{ height: gridHeight }}
          rows={buildingDataGridRows}
          columns={buildingDataGridColumns}
        />
      </Paper>
    </Box>
  );
};

export default BuildingDataGrid;

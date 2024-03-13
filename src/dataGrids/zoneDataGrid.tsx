import { Box, Paper, Typography } from "@mui/material";
import { Check as CheckIcon, Close as CloseIcon } from "@mui/icons-material";
import DataGrid from "react-data-grid";
import { dataGridButton } from "../datagridRenderers/dataGridButton";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectEntity } from "../features/selectionSlice";
import { Person, Zone } from "empire-of-evil/src/types/interfaces/entities";
import { GameManager } from "empire-of-evil";
import "react-data-grid/lib/styles.css";

const zoneDataGridColumns = [
  { key: "name", name: "Name" },
  { key: "size", name: "Size" },
  { key: "wealth", name: "Wealth" },
  { key: "intelLevel", name: "Intel Level" },
  { key: "select", name: "Select", renderCell: dataGridButton },
];

interface ZoneDataGridProps {
  title: string;
  zones: Zone[];
  gameManager: GameManager;
}

const ZoneDataGrid = ({ title, zones, gameManager }: ZoneDataGridProps) => {
  // const peopleStore = useAppSelector((state) => state.people);
  const dispatch = useAppDispatch();
  const zoneStore = useAppSelector((state) => state.zones);
  const agentDataGridRows = zones.map((zone) => {
    const {
      id,
      name,
      wealth,
      size,
      intelAttributes: { intelligenceLevel },
    } = zoneStore[zone.id];

    return {
      id,
      name,
      intelLevel: intelligenceLevel,
      wealth,
      size,
      select: (row) => {
        dispatch(
          selectEntity({
            type: "zone",
            selection: zoneStore[row.id],
          })
        );
      },
    };
  });

  return (
    <Box component="section">
      <Box component="header">
        <Typography variant="overline">{title}</Typography>
      </Box>
      <Paper>
        <DataGrid rows={agentDataGridRows} columns={zoneDataGridColumns} />
      </Paper>
    </Box>
  );
};

export default ZoneDataGrid;

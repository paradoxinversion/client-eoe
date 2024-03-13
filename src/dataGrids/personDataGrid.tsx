import { Box, Paper, Typography } from "@mui/material";
import { Check as CheckIcon, Close as CloseIcon } from "@mui/icons-material";
import DataGrid from "react-data-grid";
import { dataGridButton } from "../datagridRenderers/dataGridButton";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectEntity } from "../features/selectionSlice";
import { Person } from "empire-of-evil/src/types/interfaces/entities";
import { GameManager } from "empire-of-evil";
import "react-data-grid/lib/styles.css";
const personDataGridColumns = [
  { key: "name", name: "Name" },
  { key: "zone", name: "Zone" },
  { key: "loyalty", name: "Loyalty" },
  { key: "intelLevel", name: "Intelligence" },
  { key: "agent", name: "Agent?" },
  { key: "select", name: "Select", renderCell: dataGridButton },
];

interface PersonDataGridProps {
  title: string;
  people: Person[];
  gameManager: GameManager;
}

const PersonDataGrid = ({
  title,
  people,
  gameManager,
}: PersonDataGridProps) => {
  const peopleStore = useAppSelector((state) => state.people);
  const dispatch = useAppDispatch();
  const { gameData } = gameManager;
  const personDataGridRows = people.map((person) => {
    const { name: zoneName } = gameData.zones[person.homeZoneId];
    const { id, name, agent } = person;
    const { loyalty, intelligenceLevel } = person.intelAttributes;
    return {
      id,
      zone: zoneName,
      name,
      loyalty,
      intelLevel: intelligenceLevel,
      agent: !!agent ? <CheckIcon /> : <CloseIcon />,
      select: (row) => {
        dispatch(
          selectEntity({
            type: "person",
            selection: peopleStore[row.id],
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
        <DataGrid rows={personDataGridRows} columns={personDataGridColumns} />
      </Paper>
    </Box>
  );
};

export default PersonDataGrid;

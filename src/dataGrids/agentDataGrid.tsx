import { Box, Paper, Typography } from "@mui/material";
import { Check as CheckIcon, Close as CloseIcon } from "@mui/icons-material";
import DataGrid from "react-data-grid";
import { dataGridButton } from "../datagridRenderers/dataGridButton";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectEntity } from "../features/selectionSlice";
import { Person } from "empire-of-evil/src/types/interfaces/entities";
import { GameManager } from "empire-of-evil";
import "react-data-grid/lib/styles.css";

const agentDataGridColumns = [
  { key: "name", name: "Name" },
  { key: "health", name: "Health" },
  { key: "intelligence", name: "Intelligence" },
  { key: "combat", name: "Combat" },
  { key: "administration", name: "Administration" },
  { key: "zone", name: "Zone" },
  { key: "loyalty", name: "Loyalty" },
  { key: "select", name: "Select", renderCell: dataGridButton },
];

interface AgentDataGridProps {
  title: string;
  agents: Person[];
  gameManager: GameManager;
}

const AgentDataGrid = ({ title, agents, gameManager }: AgentDataGridProps) => {
  const peopleStore = useAppSelector((state) => state.people);
  const dispatch = useAppDispatch();
  const zoneStore = useAppSelector((state) => state.zones);
  const agentDataGridRows = agents.map((person) => {
    const { name: zoneName } = zoneStore[person.homeZoneId];
    const {
      id,
      name,
      agent,
      intelAttributes: { loyalty, intelligenceLevel },
      vitalAttributes: { health, currentHealth },
      basicAttributes: { intelligence, combat, administration },
    } = person;
    return {
      id,
      zone: zoneName,
      health: `${currentHealth}/${health}`,
      intelligence,
      combat,
      administration,
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
        <DataGrid rows={agentDataGridRows} columns={agentDataGridColumns} />
      </Paper>
    </Box>
  );
};

export default AgentDataGrid;

import { Box, Paper, Typography } from "@mui/material";
import { Check as CheckIcon, Close as CloseIcon } from "@mui/icons-material";
import DataGrid from "react-data-grid";
import { Person } from "empire-of-evil/types";
import { managers } from "empire-of-evil";
import { dataGridButton } from "../datagridRenderers/dataGridButton";
import { useAppSelector } from "../../app/hooks";
const personnelDataGridColumns = [
  { key: "name", name: "Name" },
  { key: "zone", name: "Zone" },
  { key: "loyalty", name: "Loyalty" },
  { key: "intelLevel", name: "Intelligence" },
  { key: "agent", name: "Agent?" },
  { key: "select", name: "Select", renderCell: dataGridButton },
  { key: "fire", name: "Fire", renderCell: dataGridButton },
];

interface PersonnelDataGridProps {
  title: string;
  personnel: Person[];
  fireFn: Function;
}

const PersonnelDataGrid = ({
  title,
  personnel,
  fireFn,
}: PersonnelDataGridProps) => {
  const people = useAppSelector((state) => state.people);
  const { gameData } = managers.game.GameManager.getInstance();
  const personnelDataGridRows = personnel.map((person) => {
    const { name: zoneName } = gameData.zones[person.homeZoneId];
    const {
      id,
      name,
      intelAttributes: { loyalty, intelligenceLevel },
      agent,
    } = person;
    return {
      id,
      zone: zoneName,
      name,
      loyalty,
      intelLevel: intelligenceLevel,
      agent: !!agent ? <CheckIcon /> : <CloseIcon />,
      select: () => {},
      fire: (row) => {
        // console.log(people[row.id]);
        fireFn(people[row.id]);
      },
    };
  });

  return (
    <Box component="section">
      <Box component="header">
        <Typography variant="overline">{title}</Typography>
      </Box>
      <Paper>
        <DataGrid
          rows={personnelDataGridRows}
          columns={personnelDataGridColumns}
        />
      </Paper>
    </Box>
  );
};

export default PersonnelDataGrid;

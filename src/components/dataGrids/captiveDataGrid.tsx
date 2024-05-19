import { Box, Paper, Typography } from "@mui/material";
import { Check as CheckIcon, Close as CloseIcon } from "@mui/icons-material";
import DataGrid from "react-data-grid";
import { dataGridButton } from "../datagridRenderers/dataGridButton";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { clearSelections, selectEntity } from "../../features/selectionSlice";
import {
  GoverningOrganization,
  Person,
} from "empire-of-evil/src/types/interfaces/entities";
import { GameManager } from "empire-of-evil";
import "react-data-grid/lib/styles.css";
const captiveDataGridColumns = [
  { key: "name", name: "Name" },
  { key: "zone", name: "Nation" },
  { key: "agent", name: "Agent?" },
  { key: "governingOrg", name: "Org" },
  { key: "select", name: "Select", renderCell: dataGridButton },
];

interface CaptiveDataGridProps {
  people: Person[];
}

const CaptiveDataGrid = ({ people }: CaptiveDataGridProps) => {
  const peopleStore = useAppSelector((state) => state.people);
  const dispatch = useAppDispatch();
  const { gameData } = GameManager.getInstance();
  const personDataGridRows = people.map((person) => {
    const { name: zoneName } = gameData.zones[person.homeZoneId];
    const { id, name, agent } = person;
    const { loyalty, intelligenceLevel } = person.intelAttributes;
    let org: string = "";
    if (agent) {
      org = gameData.governingOrganizations[person.agent.organizationId].name;
    }
    return {
      id,
      zone: zoneName,
      name,
      governingOrg: org,
      agent: !!agent ? <CheckIcon /> : <CloseIcon />,
      select: (row) => {
        dispatch(clearSelections());
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
        <Typography variant="overline">Captives</Typography>
      </Box>
      <Paper>
        <DataGrid rows={personDataGridRows} columns={captiveDataGridColumns} />
      </Paper>
    </Box>
  );
};

export default CaptiveDataGrid;

import { Box, Card, Typography } from "@mui/material";
import { GameManager } from "empire-of-evil";
import DataGrid from "react-data-grid";
import { useDispatch } from "react-redux";
import { dataGridButton } from "../../datagridRenderers/dataGridButton";
import { selectEntity } from "../../features/selectionSlice";
import { actions, nations, organizations } from "empire-of-evil";
import { IntegratedManagerProps } from "../..";

const nationsTableColumns = [
  { key: "nation", name: "Nation" },
  { key: "population", name: "Population" },
  { key: "zones", name: "Zones" },
  { key: "agents", name: "Agents" },
  { key: "viewNation", name: "View Nation", renderCell: dataGridButton },
];
const WorldOverview = ({ gameManager }: IntegratedManagerProps) => {
  const dispatch = useDispatch();

  const nationsArray = nations.getNations(gameManager, {});
  const nationsRows = nationsArray.map((nation) => ({
    nation: nation.name,
    population: actions.people.getPeople(gameManager, { nationId: nation.id })
      .length,
    agents: organizations.getAgents(gameManager, nation.organizationId).length,
    zones: actions.zones.getZones(gameManager, { nationId: nation.id }).length,
    viewNation: () => {
      dispatch(
        selectEntity({
          type: "nation",
          selection: null,
        })
      );
      dispatch(
        selectEntity({
          type: "nation",
          selection: nation,
        })
      );
    },
  }));

  return (
    <Box>
      <Box padding="1rem">
        <Box component="header">
          <Typography variant={"overline"}>World Nations</Typography>
        </Box>
        <Card>
          <DataGrid rows={nationsRows} columns={nationsTableColumns} />
        </Card>
      </Box>
    </Box>
  );
};

export default WorldOverview;

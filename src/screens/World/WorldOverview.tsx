import { Box, Card, Divider, Typography } from "@mui/material";
import MetricNumber from "../../elements/MetricNumber/MetricNumber";
import ZoneDataGrid from "../../dataGrids/zoneDataGrid";
import { GameManager } from "empire-of-evil";
import { Nation } from "empire-of-evil/src/types/interfaces/entities";
import { getZones } from "empire-of-evil/src/actions/zones";
import { useAppSelector } from "../../app/hooks";
import DataGrid from "react-data-grid";
import { toDataArray } from "../../utilities/dataHelpers";
import { getNationCitizens } from "empire-of-evil/src/nations";
import { getAgents } from "empire-of-evil/src/organization";
import { useDispatch } from "react-redux";
import { dataGridButton } from "../../datagridRenderers/dataGridButton";
import { selectEntity } from "../../features/selectionSlice";
interface OverviewProps {
  gameManager: GameManager;
}
const nationsTableColumns = [
  { key: "nation", name: "Nation" },
  { key: "population", name: "Population" },
  { key: "zones", name: "Zones" },
  { key: "agents", name: "Agents" },
  { key: "viewNation", name: "View Nation", renderCell: dataGridButton },
];
const WorldOverview = ({ gameManager }: OverviewProps) => {
  const dispatch = useDispatch();
  const { gameData } = gameManager;
  const nationsArray = toDataArray(gameData.nations);
  const nationsRows = nationsArray.map((nation) => ({
    nation: nation.name,
    population: getNationCitizens(gameManager, nation.id).length,
    agents: getAgents(gameManager, nation.organizationId).length,
    zones: getZones(gameManager, { nationId: nation.id }).length,
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

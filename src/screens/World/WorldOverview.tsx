import { Box, Button, Card, Grid, Typography } from "@mui/material";
import { GameManager } from "empire-of-evil";
import DataGrid from "react-data-grid";
import { useDispatch } from "react-redux";
import { dataGridButton } from "../../datagridRenderers/dataGridButton";
import { selectEntity } from "../../features/selectionSlice";
import { actions, nations, organizations } from "empire-of-evil";

const nationsTableColumns = [
  { key: "nation", name: "Nation" },
  { key: "population", name: "Population" },
  { key: "zones", name: "Zones" },
  { key: "agents", name: "Agents" },
  { key: "viewNation", name: "View Nation", renderCell: dataGridButton },
];
const WorldOverview = () => {
  const dispatch = useDispatch();

  const nationsArray = nations.getNations({});
  const nationsRows = nationsArray.map((nation) => ({
    nation: nation.name,
    population: actions.people.getPeople({ nation: { nationId: nation.id } })
      .length,
    agents: actions.people.getPeople({
      personFilter: {
        organizationId: nation.organizationId,
      },
      agentFilter: { agentsOnly: true },
    }).length,
    zones: actions.zones.getZones({ nationId: nation.id }).length,
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
        {/* <DataGrid rows={nationsRows} columns={nationsTableColumns} /> */}
      </Box>
      <Grid container spacing={1}>
        {nationsArray.map((nation) => {
          return (
            <Grid item key={nation.id}>
              <Card>
                <Typography>{nation.name}</Typography>
                <Button
                  onClick={() => {
                    dispatch(
                      selectEntity({
                        type: "nation",
                        selection: nation,
                      })
                    );
                  }}
                >
                  Select
                </Button>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default WorldOverview;

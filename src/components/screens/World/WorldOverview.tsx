import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { GameManager } from "empire-of-evil";
import DataGrid from "react-data-grid";
import { useDispatch } from "react-redux";
import { dataGridButton } from "../../datagridRenderers/dataGridButton";
import { selectEntity } from "../../../features/selectionSlice";
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
      <Box padding="1rem">
        <Grid container spacing={"1rem"}>
          {nationsArray.map((nation) => {
            return (
              <Grid item key={nation.id}>
                <Card sx={{ textAlign: "center" }}>
                  <CardHeader
                    title={nation.name}
                    titleTypographyProps={{ variant: "body2" }}
                    // sx={{ paddingBottom: 0 }}
                  />
                  <Divider />
                  <CardContent>
                    <Typography variant="body2">
                      Pop:{" "}
                      {
                        actions.people.getPeople({
                          nation: { nationId: nation.id },
                        }).length
                      }
                    </Typography>
                    <Typography variant="body2">
                      Zones:{" "}
                      {actions.zones.getZones({ nationId: nation.id }).length}
                    </Typography>
                  </CardContent>
                  <Divider />
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button
                      size="small"
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
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default WorldOverview;

import {
  Box,
  Typography,
  Divider,
  Grid,
  Dialog,
  Button,
  CardHeader,
  CardContent,
  Card,
  CardActions,
} from "@mui/material";

import { selectEntity } from "../../../features/selectionSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useEffect, useState } from "react";
import { plotSetupRenderers } from "./PlotsScreen";
import DataGrid from "react-data-grid";
import { dataGridButton } from "../../datagridRenderers/dataGridButton";
import { managers, actions } from "empire-of-evil";

const queuedPlotsColumns = [
  { key: "plot", name: "Plot" },
  { key: "agents", name: "Agents" },
  { key: "cancel", name: "Cancel", renderCell: dataGridButton },
];

const PlotsOverview = () => {
  const dispatch = useAppDispatch();
  const [plotWidgetOpen, setPlotWidgetOpen] = useState(false);
  const currentPlot = useAppSelector((state) => state.selections.plot);
  const { gameData } = managers.game.GameManager.getInstance();
  const PlotWidget = currentPlot && plotSetupRenderers[currentPlot.type];
  const plotRows = managers.plots.PlotManager.getInstance().plotQueue.map(
    (plot, index) => ({
      index,
      plot: plot.name,
      agents: plot.standardParams.participants.length,
      cancel: (row) => {
        managers.plots.PlotManager.getInstance().removePlot(index);
      },
    })
  );

  useEffect(() => {}, [managers.plots.PlotManager.getInstance().plots]);
  return (
    <Box>
      <Box>
        <Box>
          <Box component="header">
            <Typography variant="h5">Plots</Typography>
          </Box>
          <Box>
            <Box component="header">
              <Typography variant="overline">Available Plots</Typography>
            </Box>
            <Divider />
            <Box padding="1rem">
              <Grid container>
                {managers.plots.PlotManager.getInstance()
                  .plots.filter((plot) => {
                    if (plot.requirements?.personnel?.embeddedAgents) {
                      return !!actions.people.getPeople({
                        agentFilter: {
                          embeddedOnly: true,
                        },
                        personFilter: {
                          organizationId:
                            managers.game.GameManager.getInstance().gameData
                              .player.organizationId,
                        },
                      }).length;
                    }
                    return true;
                  })
                  .map((plot) => (
                    <Grid key={plot.name} item>
                      <Button
                        key={plot.name}
                        onClick={() => {
                          dispatch(
                            selectEntity({
                              type: "plot",
                              selection: {
                                name: plot.name,
                                type: plot.type,
                              },
                            })
                          );
                          setPlotWidgetOpen(true);
                        }}
                      >
                        {plot.name}
                      </Button>
                    </Grid>
                  ))}
              </Grid>
            </Box>
            <Divider />
          </Box>
        </Box>
      </Box>
      <Box component="section">
        <Box>
          <Box>
            <Box component="header">
              <Typography variant="overline">Queued Plots</Typography>
            </Box>
            <Grid container>
              {managers.plots.PlotManager.getInstance().plotQueue.map(
                (plot, index) => (
                  <Grid item key={index}>
                    <Card>
                      <CardHeader title={plot.name} />
                      <Divider />
                      <CardContent>
                        <Typography>
                          Agents: {plot.standardParams.participants.length}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button>Abort</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                )
              )}
            </Grid>
          </Box>
        </Box>
      </Box>
      {currentPlot && (
        <Dialog open={plotWidgetOpen}>
          <PlotWidget
            gameData={gameData}
            plotManager={managers.plots.PlotManager.getInstance()}
            cb={() => {
              setPlotWidgetOpen(false);
              dispatch(
                selectEntity({
                  type: "plot",
                  selection: null,
                })
              );
            }}
          />
        </Dialog>
      )}
    </Box>
  );
};

export default PlotsOverview;

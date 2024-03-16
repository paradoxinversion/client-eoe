import { Box, Typography, Divider, Grid, Dialog, Button } from "@mui/material";
import { IntegratedManagerProps } from "../..";
import { selectEntity } from "../../features/selectionSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useState } from "react";
import { plotSetupRenderers } from "./PlotsScreen";
import DataGrid from "react-data-grid";
import { dataGridButton } from "../../datagridRenderers/dataGridButton";

const queuedPlotsColumns = [
  { key: "plot", name: "Plot" },
  { key: "agents", name: "Agents" },
  { key: "cancel", name: "Cancel", renderCell: dataGridButton },
];

const PlotsOverview = ({ gameManager }: IntegratedManagerProps) => {
  const dispatch = useAppDispatch();
  const [plotWidgetOpen, setPlotWidgetOpen] = useState(false);
  const currentPlot = useAppSelector((state) => state.selections.plot);
  const { plotManager, gameData } = gameManager;
  const PlotWidget = currentPlot && plotSetupRenderers[currentPlot.type];
  const plotRows = plotManager.plotQueue.map((plot, index) => ({
    plot: plot.name,
    // @ts-ignore
    agents: plot?.plotParams?.participants?.length,
  }));
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
                {plotManager.plots.map((plot) => (
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
            <DataGrid rows={plotRows} columns={queuedPlotsColumns} />
          </Box>
        </Box>
      </Box>
      {currentPlot && (
        <Dialog open={plotWidgetOpen}>
          <PlotWidget
            gameData={gameData}
            gameManager={gameManager}
            plotManager={plotManager}
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

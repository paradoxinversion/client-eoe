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

import { selectEntity } from "../../../../features/selectionSlice";
import { useAppDispatch } from "../../../../app/hooks";
import { useState } from "react";
import { plotSetupRenderers } from "./PlotsScreen";
import { managers, actions } from "empire-of-evil";
import Plot from "empire-of-evil/src/managers/plots/Plot";

type PlotsOverviewProps = {
  currentPlot: Plot | null;
};
const PlotsOverview = ({ currentPlot }: PlotsOverviewProps) => {
  const dispatch = useAppDispatch();
  const [plotWidgetOpen, setPlotWidgetOpen] = useState(false);
  const { gameData } = managers.game.GameManager.getInstance();
  let PlotWidget;
  if (currentPlot?.type) {
    PlotWidget = plotSetupRenderers[currentPlot.type];
  }

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
                          Agents: {plot.totalParticipants}
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
        <Dialog open={plotWidgetOpen} scroll="paper">
          <PlotWidget
            gameData={gameData}
            plotManager={managers.plots.PlotManager.getInstance()}
            onClose={() => {
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

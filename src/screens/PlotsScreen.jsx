import { getActivityParticipants } from "empire-of-evil/src/plots";
import { useState, useRef, useEffect } from "react";
import AgentSelector from "../elements/AgentSelector/AgentSelector";
import AttackZonePlot from "../elements/AttackZonePlot";
import Modal from "../elements/Modal";
import ReconPlot from "../elements/ReconPlot";
import { dataGridButton } from "../datagridRenderers/dataGridButton";
import {
  Box,
  Button,
  Grid,
  Toolbar,
  Divider,
  Dialog,
  DialogContent,
  Typography,
  Card,
  Paper,
} from "@mui/material";
import DataGrid from "react-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { selectEntity } from "../features/selectionSlice";

const eoe = require("empire-of-evil");

const plotsWidgets = {
  "attack-zone": AttackZonePlot,
  "recon-zone": ReconPlot,
};

const queuedPlotsColumns = [
  { key: "plot", name: "Plot" },
  { key: "agents", name: "Agents" },
  { key: "cancel", name: "Cancel", renderCell: dataGridButton },
];

const activitiesColumns = [
  { key: "agent", name: "Agent" },
  { key: "activity", name: "Activity" },
];

/**
 *
 * @param {Object} props
 * @param {ActivityManager} props.activityManager
 * @returns
 */
const PlotsScreen = ({ gameManager }) => {
  const dispatch = useDispatch();
  const { gameData, activityManager, plotManager } = gameManager;
  const [currentActivity, setCurrentActivity] = useState(null);
  const currentPlot = useSelector((state) => state.selections.plot);
  const [plotWidgetOpen, setPlotWidgetOpen] = useState(false);
  const onClickActivity = (activity) => {
    dispatch(
      selectEntity({
        type: "activity",
        selection: { name: activity.name, agents: activity.agents },
      })
    );
    setCurrentActivity(activity);
  };

  /**
   *
   * @param {string} participantId
   * @param {boolean} add
   */
  const onUpdateActivityParticipant = (participantId, add) => {
    if (add) {
      currentActivity.addAgent(gameManager, gameData.people[participantId].id);
    } else {
      currentActivity.removeAgent(
        gameManager,
        gameData.people[participantId].id
      );
    }
  };
  const plotRows = plotManager.plotQueue.map((plot, index) => ({
    plot: plot.name,
    agents: plot?.plotParams?.participants?.length,
  }));

  const activityRows = getActivityParticipants(gameManager).map(
    (participant, index) => ({
      agent: participant.participant.name,
      activity: participant.activity,
    })
  );
  const PlotWidget = currentPlot && plotsWidgets[currentPlot.type];

  return (
    <Box component="section">
      <Toolbar />
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
      {currentActivity && (
        <Modal>
          <Box>
            <Box component="header">
              <p className="text-xl font-bold">
                {currentActivity.name}: Participants
              </p>
            </Box>
            <AgentSelector
              agentsArray={eoe.organizations._getAgents(gameManager, {
                organizationId: gameData.player.organizationId,
                exclude: {
                  unavailable: true,
                },
              })}
              cb={onUpdateActivityParticipant}
              participantsArray={currentActivity.agents}
            />
            <Button
              className="btn btn-primary"
              onClick={() => {
                dispatch(
                  selectEntity({
                    type: "activity",
                    selection: null,
                  })
                );
                setCurrentActivity(null);
              }}
            >
              Close
            </Button>
          </Box>
        </Modal>
      )}
      <Box>
        <Box component="header" padding="1rem">
          <Typography variant="h3">EVIL Plots & Activities</Typography>
        </Box>
        <Divider />
        <Grid padding="1rem" container columns={10} spacing={"1rem"}>
          <Grid item xs={5}>
            <Box>
              <Box>
                <Box>
                  <Box component="header">
                    <Typography variant="h5">Plots</Typography>
                  </Box>
                  <Box>
                    <Box component="header">
                      <Typography variant="overline">
                        Available Plots
                      </Typography>
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
                {/* {currentPlot && (
                <PlotWidget
                  gameData={gameData}
                  gameManager={gameManager}
                  plotManager={plotManager}
                  cb={() => {
                    dispatch(
                      selectEntity({
                        type: "plot",
                        selection: null,
                      })
                    );
                  }}
                />
              )} */}
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
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box className="">
              <Box component="header">
                <Typography variant="h5">Activities</Typography>
              </Box>
              <Box>
                <Box component="header">
                  <Typography variant="overline">
                    Available Activities
                  </Typography>
                </Box>
                <Divider />
                <Box padding="1rem">
                  <Grid container>
                    {activityManager.activities.map((activity) => (
                      <Grid item>
                        <Button
                          key={`${activity.name}`}
                          onClick={() => {
                            onClickActivity(activity);
                          }}
                        >
                          {activity.name}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box>
              <Box className="mb-4">
                <Box>
                  <Box component="header">
                    <Typography variant="overline">
                      Activity Participants
                    </Typography>
                  </Box>

                  <Paper>
                    <DataGrid rows={activityRows} columns={activitiesColumns} />
                  </Paper>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default PlotsScreen;

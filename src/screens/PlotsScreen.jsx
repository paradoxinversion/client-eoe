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
      <Box className="p-2">
        <Box component="header" className="mb-4">
          <p className="text-3xl font-bold">EVIL Plots & Activities</p>
        </Box>

        <Box component="section">
          <Box>
            <Box>
              <Box component="header">
                <p className="text-2xl font-bold">Plots</p>
              </Box>
              <Box>
                <Box component="header">
                  <p className="text-xl font-bold">Available Plots</p>
                </Box>
                <Divider />

                <Grid container className="grid grid-cols-12 my-2">
                  {plotManager.plots.map((plot) => (
                    <Grid key={plot.name} item>
                      <Button
                        key={plot.name}
                        className="btn btn-primary border rounded"
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
                {currentPlot && 
                
                  <Dialog open={plotWidgetOpen}>
                    <DialogContent>
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
                    </DialogContent>
                  </Dialog>
                }
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
          </Box>

          <Box component="section">
            <Box className="mb-4">
              <Box>
                <Box component="header" className="mb-4">
                  <p className="text-lg text-stone-700 font-bold border-b border-stone-700">
                    Queued Plots
                  </p>
                </Box>
                <DataGrid rows={plotRows} columns={queuedPlotsColumns} />
              </Box>
            </Box>
          </Box>
          <Box className="">
            <Box component="header">
              <p className="text-2xl font-bold">Activities</p>
            </Box>
            <Box>
              <Box component="header">
                <p className="text-xl font-bold border-b">
                  Available Activities
                </p>
              </Box>
              <Box>
                <Grid container className="grid grid-cols-12 my-2">
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
          <Box>
            <Box className="mb-4">
              <Box>
                <Box component="header" className="mb-4">
                  <p className="text-lg text-stone-700 font-bold border-b border-stone-700">
                    Activity Participants
                  </p>
                </Box>
                <DataGrid rows={activityRows} columns={activitiesColumns} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PlotsScreen;

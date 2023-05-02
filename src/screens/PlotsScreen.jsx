import { getActivityParticipants } from "empire-of-evil/src/plots";
import { useState } from "react";
import AgentSelector from "../elements/AgentSelector/AgentSelector";
import AttackZonePlot from "../elements/AttackZonePlot";
import Modal from "../elements/Modal";
import ReconPlot from "../elements/ReconPlot";
const eoe = require("empire-of-evil");

const plotsWidgets = {
  "attack-zone": AttackZonePlot,
  "recon-zone": ReconPlot
};

/**
 *
 * @param {Object} props
 * @param {ActivityManager} props.activityManager
 * @returns
 */
const PlotsScreen = ({ gameManager }) => {
  const {gameData, activityManager, plotManager} = gameManager;
  const [currentActivity, setCurrentActivity] = useState(null);
  const [currentPlot, setCurrentPlot] = useState(null);
  const onClickActivity = (activityName) => {
    setCurrentActivity(activityName);
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
      currentActivity.removeAgent(gameManager, gameData.people[participantId].id);
    }
  };

  const PlotWidget = currentPlot && plotsWidgets[currentPlot.type];
  return (
    <section>
      {currentPlot && (
        <Modal>
          <PlotWidget
            gameData={gameData}
            gameManager={gameManager}
            plotManager={plotManager}
            cb={() => {
              setCurrentPlot(null);
            }}
          />
        </Modal>
      )}
      {currentActivity && (
        <Modal>
          <div>
            <header>
              <p className="text-xl font-bold">
                {currentActivity.name}: Participants
              </p>
            </header>
            <AgentSelector
              agentsArray={eoe.organizations._getAgents(
                gameManager,
                {
                  organizationId: gameData.player.organizationId,
                  exclude: {
                    unavailable: true
                  }
                }
              )}
              cb={onUpdateActivityParticipant}
              participantsArray={currentActivity.agents}
            />
            <button className="btn btn-primary" onClick={()=>{setCurrentActivity(null)}}>Close</button>
          </div>
        </Modal>
      )}
      <div
        id="top-bar"
        className="bg-stone-900 w-full text-stone-300 flex justify-end items-center h-10"
      />
      <div className="p-2">
        <header className="mb-4">
          <p className="text-3xl font-bold">EVIL Plots & Activities</p>
        </header>

        <section>
          <section>
            <div>
              <header>
                <p className="text-2xl font-bold">Plots</p>
              </header>
              <div>
                <header>
                  <p className="text-xl font-bold border-b border-stone-700">
                    Available Plots
                  </p>
                </header>

                <div className="grid grid-cols-12 my-2">
                  {plotManager.plots.map((plot) => (
                    <button
                      key={plot.name}
                      className="btn btn-primary border rounded"
                      onClick={() => {
                        setCurrentPlot(plot);
                      }}
                    >
                      {plot.name}
                    </button>
                  ))}
                </div>
              </div>
              {currentPlot && (
                <PlotWidget
                  gameData={gameData}
                  gameManager={gameManager}
                  plotManager={plotManager}
                  cb={() => {
                    setCurrentPlot(null);
                  }}
                />
              )}
            </div>
          </section>

          <section>
            <div className="mb-4">
              <div>
                <header className="mb-4">
                  <p className="text-lg text-stone-700 font-bold border-b border-stone-700">
                    Queued Plots
                  </p>
                </header>
                <table>
                  <thead>
                    <tr>
                      <th>Plot</th>
                      <th>Agents</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plotManager.plotQueue.map((plot, index) => (
                      <tr key={`plot-${index}-${plot.type}`}>
                        <td>{plot.name}</td>
                        <td>{plot?.plotParams?.participants?.length}</td>
                        <td>
                          <button className="border rounded px-2">
                            cancel
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
          <div className="">
            <header>
              <p className="text-2xl font-bold">Activities</p>
            </header>
            <div>
              <header>
                <p className="text-xl font-bold border-b">
                  Available Activities
                </p>
              </header>
              <section>
                <div className="grid grid-cols-12 my-2">
                  {activityManager.activities.map((activity) => (
                    <button
                      key={`${activity.name}`}
                      className="btn btn-primary rounded"
                      onClick={() => {
                        onClickActivity(activity);
                      }}
                    >
                      {activity.name}
                    </button>
                  ))}
                </div>
              </section>
            </div>
            
          </div>
          <section>
            <div className="mb-4">
              <div>
                <header className="mb-4">
                  <p className="text-lg text-stone-700 font-bold border-b border-stone-700">
                    Activity Participants
                  </p>
                </header>
                <table>
                  <thead>
                    <tr>
                      <th>Agent</th>
                      <th>Activity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getActivityParticipants(gameManager).map((participant, index) => (
                      <tr key={`plot-${index}-${participant.type}`}>
                        <td>{participant.participant.name}</td>
                        <td>{participant.activity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </section>
      </div>
    </section>
  );
};

export default PlotsScreen;

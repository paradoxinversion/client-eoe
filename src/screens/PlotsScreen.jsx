import { useState } from "react";
import AgentSelector from "../elements/AgentSelector";
import AttackZonePlot from "../elements/AttackZonePlot";
import { toDataArray } from "../utilities/dataHelpers";
const eoe = require("empire-of-evil");

const plotsWidgets = {
  "attack-zone": AttackZonePlot,
};

/**
 *
 * @param {Object} props
 * @param {ActivityManager} props.activityManager
 * @returns
 */
const PlotsScreen = ({ gameData, activityManager, plotManager }) => {
  const [currentActivity, setCurrentActivity] = useState(null);
  const [currentPlot, setCurrentPlot] = useState(null);
  const onClickActivity = (activityName) => {
    setCurrentActivity(activityName);
  };

  const onUpdateActivityParticipant = (participantId, add) => {
    console.log(participantId, add);
    if (add) {
      currentActivity.addAgent(gameData.people[participantId]);
    } else {
      currentActivity.removeAgent(gameData.people[participantId]);
    }
  };

  const PlotWidget = currentPlot && plotsWidgets[currentPlot.type];
  return (
    <section>
      <header>
        <p className="text-3xl font-bold">EVIL Plots</p>
      </header>

      <section className="">
        <div className="grid grid-cols-2 gap-4 h-48">
          <div>
            <header>
              <p className="text-xl font-bold border-b">EVIL Activities</p>
            </header>
            <section>
              <div className="grid grid-cols-6">
                {activityManager.activities.map((activity) => (
                  <button
                    key={`${activity.name}`}
                    className="border m-2"
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
          {currentActivity && (
            <div>
              <header>
                <p className="text-xl font-bold">
                  {currentActivity.name}: Participants
                </p>
              </header>
              <AgentSelector
                agentsArray={eoe.organizations.getAgents(
                  toDataArray(gameData.people),
                  gameData.player.organizationId
                )}
                cb={onUpdateActivityParticipant}
                participantsArray={currentActivity.agents}
              />
            </div>
          )}
        </div>

        <section>
          <div className="grid grid-cols-2">
            <div>
              <header>
                <p className="text-xl font-bold border-b">EVIL Plots</p>
              </header>

              <div className="grid grid-cols-2">
                {plotManager.plots.map((plot) => (
                  <button
                  key={plot.name}
                  className="m-2 border"
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
              <PlotWidget gameData={gameData} plotManager={plotManager} cb={()=>{
                setCurrentPlot(null)
              }} />
            )}
          </div>
        </section>

        <section>
          <div className="grid grid-cols-2 gap-2">
            <div>

              <header>
                <p className="text-xl font-bold border-b">Queued Plots</p>
              </header>
              <table>
                <thead>
                  <tr>

                    <th>Plot</th>
                    <th>Agents</th>
                  </tr>
                </thead>
                <tbody>

                  {plotManager.plotQueue.map((plot, index)=>(
                    <tr key={`plot-${index}-${plot.type}`} >
                      <td>{plot.name}</td>
                      <td>{plot?.agents?.length}</td>
                      <td><button className="border rounded px-2">cancel</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
};

export default PlotsScreen;

import { getAgents } from "empire-of-evil/src/organization";
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

  const peopleArray = toDataArray(gameData.people);
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
              // <div>
              //   <p className="text-xl font-bold">
              //     {currentPlot.name}: Participants
              //   </p>
              //   {getAgents(peopleArray, gameData.player.organizationId).map(
              //     (agent) => {
              //       return (
              //         <div>
              //           <input type={"checkbox"} name="plot-participants" />
              //           <label htmlFor="plot-participants">{agent.name}</label>
              //         </div>
              //       );
              //     }
              //   )}
              //   <button className="hover:bg-stone-500 p-2">Confirm</button>
              //   <button className="hover:bg-stone-500 p-2">Cancel</button>
              // </div>
              <PlotWidget gameData={gameData} plotManager={plotManager} />
            )}
          </div>
        </section>
      </section>
    </section>
  );
};

export default PlotsScreen;

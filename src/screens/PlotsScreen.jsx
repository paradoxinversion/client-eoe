import { ActivityManager } from "empire-of-evil/src/plots";
import { useState } from "react";
import AgentSelector from "../elements/AgentSelector";
import Button from "../elements/Button";
import { toDataArray } from "../utilities/dataHelpers";
const eoe = require("empire-of-evil");

/**
 *
 * @param {Object} props
 * @param {ActivityManager} props.activityManager
 * @returns
 */
const PlotsScreen = ({ gameData, activityManager }) => {
  const [currentActivity, setCurrentActivity] = useState(null);

  const onClickActivity = (activityName) => {
    setCurrentActivity(activityName);
  };

  const onUpdateActivityParticipant = (participantId, add) => {
    console.log(participantId, add)
    if (add){

      currentActivity.addAgent(gameData.people[participantId]);
    } else {
      currentActivity.removeAgent(gameData.people[participantId])
    }
  }
  return (
    <section>
      <header>
        <p>Plots</p>
      </header>

      <section>
        <header>EVIL Activities</header>
        <section>
          <div>
            {activityManager.activities.map((activity) => (
              <Button
                buttonText={activity.name}
                style="m-2"
                onClick={() => {
                  onClickActivity(activity);
                }}
              />
            ))}
          </div>
        </section>
        {currentActivity && (
          <AgentSelector
            agentsArray={eoe.organizations.getAgents(
              toDataArray(gameData.people),
              gameData.player.organizationId
            )}
            cb={onUpdateActivityParticipant}
            participantsArray={currentActivity.agents}
          />
        )}
      </section>
    </section>
  );
};

export default PlotsScreen;

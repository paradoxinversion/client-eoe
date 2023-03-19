import {
  getAgents,
  getAgentSubordinates,
} from "empire-of-evil/src/organization";
import { useState } from "react";
import { toDataArray } from "../utilities/dataHelpers";

/**
 * @param {object} props
 * @param {object} props.currentGameEvent
 * @param {Function} props.resolveEvent
 * @param {import("empire-of-evil/src/typedef").GameData} props.gameData
 * @returns
 */
const EventScreenRecruit = ({ gameData, currentGameEvent, resolveEvent }) => {
  const [department, setDepartment] = useState(null);
  const [commander, setCommander] = useState(null);
  const onChange = (event) => {
    setDepartment(event.target.value);
  };
  const onCommanderSelect = (event) => {
    setCommander(event.target.value);
  };
  return (
    <section>
      <section className="mb-4">
        <header>
          <h2>Recruit Details</h2>
        </header>
        <p>{currentGameEvent.recruit?.name}</p>
        <p>Combat: {currentGameEvent.params.recruit?.combat}</p>
        <p>Administration: {currentGameEvent.params.recruit?.administration}</p>
        <p>Intelligence: {currentGameEvent.params.recruit?.intelligence}</p>
        <p>Leadership: {currentGameEvent.params.recruit?.leadership}</p>
        <p>Loyalty: {currentGameEvent.params.recruit?.loyalty}?</p>
      </section>

      <section className="mb-4">
        <p className="text-lg border-b mb-4">
          Select a department for this recruit
        </p>
        <form className="grid grid-cols-3 gap-2" onChange={onChange}>
          <div className="bg-stone-800 rounded p-2">
            <input
              type="radio"
              id="recruit-department-trooper"
              name="recruit-department"
              value={0}
            />
            <label htmlFor="recruit-department-trooper">Henchman</label>
          </div>
          <div className="bg-stone-800 rounded p-2">
            <input
              type="radio"
              id="recruit-department-administrator"
              name="recruit-department"
              value={1}
            />
            <label htmlFor="recruit-department-administrator">
              Administrator
            </label>
          </div>
          <div className="bg-stone-800 rounded p-2">
            <input
              type="radio"
              id="recruit-department-scientist"
              name="recruit-department"
              value={2}
            />
            <label htmlFor="recruit-department-scientist">Scientist</label>
          </div>
        </form>
        <p className="text-lg border-b mb-4">Commander</p>
        <form onChange={onCommanderSelect}>
          <div className="grid grid-cols-6 gap-2">
            {getAgents(
              gameData,
              gameData.player.organizationId
            ).map((agent) => {
              const subordinates = getAgentSubordinates(
                gameData,
                agent
              );
              return (
                <div key={`event-screen-recruit-${agent.id}`} className="bg-stone-800 rounded p-2">
                  <input
                    type="radio"
                    id="recruit-commander"
                    name="recruit-commander"
                    value={agent.id}
                    disabled={subordinates.length === agent.leadership}
                  />
                  <label htmlFor="recruit-commander">
                    {agent.name} ({subordinates.length}/{agent.leadership})
                  </label>
                </div>
              );
            })}
          </div>
        </form>
      </section>
      <section className="w-32 flex justify-between">
        <button
          className="p-2 hover:bg-stone-700 disabled:bg-stone-900"
          disabled={department === null || commander === null}
          onClick={() => {
            resolveEvent({
              resolutionValue: 1,
              data: {
                department,
                commander,
              },
            });
          }}
        >
          Accept
        </button>
        <button
          className="p-2 hover:bg-red-700 disabled:bg-stone-400"
          onClick={() => {
            resolveEvent({
              resolutionValue: 0,
            });
          }}
        >
          {" "}
          Deny
        </button>
      </section>
    </section>
  );
};

export default EventScreenRecruit;

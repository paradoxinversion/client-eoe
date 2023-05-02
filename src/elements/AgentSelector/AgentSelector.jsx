/**
 * A component to select Agents.
 * @param {Object} props 
 * @param {import("empire-of-evil/src/typedef").Person[]} props.agentsArray
 */
const AgentSelector = ({agentsArray, cb, participantsArray}) => {
  /**
   * 
   * @param {Event} event 
   */
  const handleCheckbox = (event) => {
    const value = event.target.checked;
    const agentId = event.target.name;
    cb && cb(agentId, value);
  }
  return (
    <div>
      {agentsArray.map(agent => (
        <div key={agent.id}>
          <input className="mr-2" type={"checkbox"} name={agent.id} onChange={handleCheckbox} defaultChecked={participantsArray.includes(agent.id)} />
          <label htmlFor={agent.id}>{agent.name}</label>
        </div>
      ))}
    </div>
  )
}

export default AgentSelector;
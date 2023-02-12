import PersonPanel from "../elements/PersonPanel";
import { toDataArray } from "../utilities/dataHelpers";
const eoe = require('empire-of-evil')
const PersonnelScreen = ({gameData}) => {
  return (
    <section>
      <header className="text-3xl font-bold">
        <p>Empire Personnel</p>
      </header>
      <p>Empire Roster Total: {eoe.organizations.getAgents(
          toDataArray(gameData.people),
          gameData.player.organizationId
        ).length}</p>
      <PersonPanel 
        title={"Troopers"}
        people={eoe.organizations.getAgents(
          toDataArray(gameData.people),
          gameData.player.organizationId
        ).filter(person => person.agent.department === 0)} 
      />
      <PersonPanel 
        title={"Administrators"}
        people={eoe.organizations.getAgents(
          toDataArray(gameData.people),
          gameData.player.organizationId
        ).filter(person => person.agent.department === 1)} 
      />
      <PersonPanel 
        title={"Scientists"}
        people={eoe.organizations.getAgents(
          toDataArray(gameData.people),
          gameData.player.organizationId
        ).filter(person => person.agent.department === 2)} 
      />
    </section>
  );
};

export default PersonnelScreen;

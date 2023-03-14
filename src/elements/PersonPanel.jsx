import { getAgentSubordinates } from "empire-of-evil/src/organization";
import { toDataArray } from "../utilities/dataHelpers";

const PersonPanel = ({ gameData, title, people, cb }) => {
  return (
    <section className="mb-4 h-64">
      <header className="text-xl font-bold border-b">
        <p>{title}</p>
      </header>
      <div className="p-2 h-64 overflow-y-auto">
        <table className="table-fixed">
          <thead className="sticky">
            <tr className="text-left">

              <th className="pr-4">Name</th>
              <th className="pr-4">Health</th>
              <th className="pr-4">Department</th>
              <th className="pr-4">Leadership</th>
              <th className="pr-4">Location</th>
            </tr>
          </thead>
          <tbody>
            {people.map((person) => (
              <tr key={person.id} onClick={()=>{cb(person)}}>
                <td className="pr-4">{person.name}</td>
                <td className="text-right pr-4">{person.currentHealth}/{person.health}</td>
                <td className="text-right pr-4">{person.agent.department}</td>
                <td className="text-right pr-4">{getAgentSubordinates(gameData, person).length}/{person.leadership}</td>
                <td className="text-right pr-4">{gameData?.zones[person.homeZoneId]?.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PersonPanel;

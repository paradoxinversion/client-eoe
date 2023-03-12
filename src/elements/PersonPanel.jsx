import { getAgentSubordinates } from "empire-of-evil/src/organization";
import { toDataArray } from "../utilities/dataHelpers";

const PersonPanel = ({ gameData, title, people, cb }) => {
  return (
    <section className="mb-4 h-64">
      <header className="text-xl font-bold border-b">
        <p>{title}</p>
      </header>
      <div className="p-2 h-64 overflow-y-auto">
        <table className="table-fixed border-separate border-spacing-2">
          <thead className="sticky">
            <tr>

              <th>Name</th>
              <th>Health</th>
              <th>Department</th>
              <th>Leadership</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {people.map((person) => (
              <tr key={person.id} onClick={()=>{cb(person)}}>
                <td>{person.name}</td>
                <td>{person.currentHealth}/{person.health}</td>
                <td>{person.agent.department}</td>
                <td>{getAgentSubordinates(toDataArray(gameData.people), person).length}/{person.leadership}</td>
                <td>{gameData?.zones[person.homeZoneId]?.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PersonPanel;

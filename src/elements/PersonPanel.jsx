import { getAgentSubordinates } from "empire-of-evil/src/organization";
import { toDataArray } from "../utilities/dataHelpers";
import { GameManager } from "empire-of-evil";
import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';

const columns = [
  { key: 'name', name: 'Name' },
  { key: 'health', name: 'Health' },
  { key: 'department', name: 'Department' },
  { key: 'leadership', name: 'Leadership' },
  { key: 'location', name: 'Location' },
];
const PersonPanel = ({ gameManager, title, people, cb }) => {
  const {gameData} = gameManager;

  const rows = people.map((person, index) => {
    return {
      name: person.name,
      health: `${person.currentHealth}/${person.health}`,
      department: person.agent.department,
      leadership: `${getAgentSubordinates(gameManager, person).length}/${person.leadership}`,
      location: gameData?.zones[person.homeZoneId]?.name
    }
  });

  return (
    <section className="mb-4 h-64">
      <header className="text-lg text-stone-700 font-bold border-b">
        <p>{title}</p>
      </header>
      <div className="mr-4 h-64 overflow-y-auto">
        <DataGrid columns={columns} rows={rows} />
        {/* <table >
          <thead >
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
              <tr key={person.id} onClick={()=>{cb(person)}} className="border-b border-stone-400">
                <td>{person.name}</td>
                <td>{person.currentHealth}/{person.health}</td>
                <td>{person.agent.department}</td>
                <td>{getAgentSubordinates(gameManager, person).length}/{person.leadership}</td>
                <td>{gameData?.zones[person.homeZoneId]?.name}</td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </div>
    </section>
  );
  // return (
  //   <section className="mb-4 h-64">
  //     <header className="text-lg text-stone-700 font-bold border-b">
  //       <p>{title}</p>
  //     </header>
  //     <div className="mr-4 h-64 overflow-y-auto">
  //       <table >
  //         <thead >
  //           <tr>
  //             <th>Name</th>
  //             <th>Health</th>
  //             <th>Department</th>
  //             <th>Leadership</th>
  //             <th>Location</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {people.map((person) => (
  //             <tr key={person.id} onClick={()=>{cb(person)}} className="border-b border-stone-400">
  //               <td>{person.name}</td>
  //               <td>{person.currentHealth}/{person.health}</td>
  //               <td>{person.agent.department}</td>
  //               <td>{getAgentSubordinates(gameManager, person).length}/{person.leadership}</td>
  //               <td>{gameData?.zones[person.homeZoneId]?.name}</td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>
  //   </section>
  // );
};

export default PersonPanel;

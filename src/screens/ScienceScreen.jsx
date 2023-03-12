import { getOrgLabs } from "empire-of-evil/src/buildings";
import { toDataArray } from "../utilities/dataHelpers";

/**
 * 
 * @param {Object} props
 * @param {import("empire-of-evil/src/typedef").GameData} props.gameData
 * @returns 
 */
const ScienceScreen = ({gameData}) => {
  const buildingsArray = toDataArray(gameData.buildings);
  const labs = getOrgLabs(buildingsArray, gameData.player.organizationId);
  console.log(labs)
  return (
    <section>
      <header>
        <p>Science</p>
      </header>
      <section>
        <header>
          <p>Labs</p>
        </header>
        <table>
          <thead>

            <tr className="text-left">
              <th>Lab</th>
              <th>Max Scientists</th>
            </tr>
          </thead>
          <tbody>
            {
              labs.map(lab => {
                
                return (
                  <tr key={lab.id} className="">
                    <td>{lab.name}</td>
                    <td className="text-right">{lab.maxPersonnel}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </section>
    </section>
  );
};

export default ScienceScreen;

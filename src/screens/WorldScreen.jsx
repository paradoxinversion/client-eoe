import { useState } from "react";
import ZonePanel from "../elements/ZonePanel";
import { toDataArray } from "../utilities/dataHelpers";
const eoe = require("empire-of-evil");
const WorldScreen = ({ gameData }) => {
  const [selectedNation, setSelectedNation] = useState(null);
  return (
    <section>
      <header>
        <p className="text-3xl font-bold">World</p>
      </header>
      <div className="flex">
        <section>
          <header className="text-2xl font-bold mb-2">
            <p>Nations</p>
          </header>
          {toDataArray(gameData.nations)
            .filter((nation) => nation.id !== gameData.player.empireId)
            .map((nation) => (
              <div>
                <button
                  className="mb-2 px-2 border rounded"
                  onClick={() => {
                    setSelectedNation(nation);
                  }}
                >
                  {nation.name}
                </button>
              </div>
            ))}
        </section>
        
        {selectedNation && (
          <section className="ml-4">
            <header className="text-2xl font-bold mb-2">
              <p>{selectedNation.name}</p>
            </header>
            <section className="mb-4">
              <p>Nation Size: {selectedNation.size}?</p>
              <p>
                Nation Citizens:{" "}
                {eoe.citizens.getCitizens(
                  toDataArray(gameData.people),
                  selectedNation.id
                ).length}?
              </p>
              <p>Nation Agents: 9999?</p>
            </section>
            <ZonePanel
              title={`${eoe.zones.getZones(toDataArray(gameData.zones), selectedNation.id).length} Zones`}
              zones={eoe.zones.getZones(
                toDataArray(gameData.zones),
                selectedNation.id
              )}
            />
          </section>
        )}
      </div>
    </section>
  );
};

export default WorldScreen;

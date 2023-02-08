import settings from "./config";

const eoe = require("empire-of-evil");
const NewGame = ({setScreen, setGameData}) => {

    const handleNewGame = () => {
        // Set up the game data object's shape
        const newGameData = {
            nations: {},
            governingOrganizations: {},
            zones: {},
            people: {}
        }

        // Generate initial nations
        newGameData.nations = eoe.gameGenerators.generateNations(settings.NATIONS_AMT, 1, 10);

        // For each nation, create a gov org
        Object.values(newGameData.nations).forEach(nation => {
            const newOrg = eoe.gameGenerators.generateGoverningOrg({nationId: nation.id})
            newGameData.governingOrganizations[newOrg.id] = newOrg
        });

        // For each nation, create zones
        Object.values(newGameData.nations).forEach(nation => {
            const newZones = eoe.gameGenerators.generateZones(nation.size);

            Object.values(newZones).forEach(zone => {
                newGameData.zones[zone.id] = {
                    ...zone,
                    nationId: nation.id
                }
            })
        })

        // For each zone, create people
        Object.values(newGameData.zones).forEach(zone => {
            for (let personIndex = 0; personIndex < Object.values(newGameData.zones).length; personIndex++) {
                const p = eoe.gameGenerators.generatePerson({
                    nationId: zone.nationId,
                    homeZoneId: zone.id
                });
                newGameData.people[p.id] = p;
            }
        });


        console.log(newGameData)
        setGameData(newGameData)
    }
    return (
        <div>
            <p>New Game</p>
            <button onClick={handleNewGame}>Go</button>
        </div>
    )
}

export default NewGame;
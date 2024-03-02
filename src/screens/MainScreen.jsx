import { advanceDay } from "empire-of-evil/src/actions";
import {
  checkGameOverState,
  checkVictoryState,
} from "empire-of-evil/src/utilities";
import { useEffect } from "react";
import MetricCard from "../elements/MetricCard/MetricCard";
import MetricNumber from "../elements/MetricNumber/MetricNumber";

const eoe = require("empire-of-evil");

/**
 *
 * @param {Object} props
 * @param {import("empire-of-evil/src/typedef").GameData} props.gameData
 * @returns
 */
const MainScreen = ({
  setScreen,
  gameManager
}) => {
  const {gameData} = gameManager;
  const empireZones = eoe.zones.getZones(gameManager, gameManager.gameData.player.empireId);
  const empireWealth = eoe.zones.getZonesWealth(gameManager, empireZones);
  const infraCost = eoe.buildings.getInfrastructureLoad(
    gameManager,
    gameData.player.organizationId
  );
  const science = eoe.organizations.getScience(
    gameManager,
    gameManager.gameData.player.organizationId
  );
  const infrastructure = eoe.organizations.getInfrastructure(
    gameManager,
    gameManager.gameData.player.organizationId
  );
  const buildingUpkeep = eoe.buildings.getUpkeep(
    gameManager,
    gameManager.gameData.player.organizationId
  );
  const payroll = eoe.organizations.getPayroll(
    gameManager,
    gameManager.gameData.player.organizationId
  );
  const wealthBonuses = eoe.buildings.getWealthBonuses(
    gameManager,
    gameManager.gameData.player.organizationId
  );
  useEffect(() => {
    const gameOver = checkGameOverState(gameManager);
    if (gameOver) {
      setScreen("game-over");
    }
    // const victory = checkVictoryState(gameData);
    // if (victory){
    //   setScreen("victory")
    // }
  }, [gameManager, setScreen]);
  return (
    <div className="h-full">
      <div
        id="top-bar"
        className="bg-stone-900 w-full text-stone-300 flex justify-end items-center"
      >
        <button
          className="btn"
          onClick={() => {
            const result = advanceDay(
              gameManager,
            );
            // const gameOver = checkGameOverState(result.updatedGameData);
            // if (gameOver) {
            //   setScreen("game-over");
            // }
            // const victory = checkVictoryState(result.updatedGameData);
            // if (victory){
            //   setScreen("victory")
            // }
            setScreen("events");
          }}
        >
          {new Date(gameData.gameDate).toDateString()}
        </button>
      </div>
      <section className="p-2">
        <header id="main-header" className="h-16">
          <p className="text-3xl font-bold">Welcome, OVERLORD</p>
        </header>
        <div className="grid grid-cols-6 gap-4 w-fit">
          <div
            id="empire-resources"
            className="shadow border rounded border-stone-300 w-48 flex flex-col p-2"
          >
            <header className="font-semibold text-center">
              <p>Empire Resources</p>
            </header>
            <div className="text-xs font-bold text-green-600 tracking-wide uppercase">
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                  />
                </svg>
                Wealth $
                {
                  gameData.governingOrganizations[
                    gameData.player.organizationId
                  ].wealth
                }{" "}
                (+${empireWealth + wealthBonuses})
              </p>
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                  />
                </svg>
                Infrastructure {infraCost}/{infrastructure}
              </p>
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
                  />
                </svg>
                Science {science}
              </p>
            </div>
          </div>
          <div className="shadow border rounded border-stone-300 w-48 flex flex-col p-2">
            <header className="font-semibold text-center">
              <p>Empire Expenses</p>
            </header>
            <div className="text-xs uppercase text-red-500 font-bold tracking-wide">
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 2.25a.75.75 0 000 1.5v16.5h-.75a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5h-.75V3.75a.75.75 0 000-1.5h-15zM9 6a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H9zm-.75 3.75A.75.75 0 019 9h1.5a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM9 12a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H9zm3.75-5.25A.75.75 0 0113.5 6H15a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM13.5 9a.75.75 0 000 1.5H15A.75.75 0 0015 9h-1.5zm-.75 3.75a.75.75 0 01.75-.75H15a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM9 19.5v-2.25a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75v2.25a.75.75 0 01-.75.75h-4.5A.75.75 0 019 19.5z"
                    clipRule="evenodd"
                  />
                </svg>
                Building Upkeep ${buildingUpkeep}
              </p>
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z" />
                  <path
                    fillRule="evenodd"
                    d="M22.5 9.75h-21v7.5a3 3 0 003 3h15a3 3 0 003-3v-7.5zm-18 3.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
                    clipRule="evenodd"
                  />
                </svg>
                Payroll ${payroll}
              </p>
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
                </svg>
                Total Expenses ${payroll + buildingUpkeep}
              </p>
            </div>
          </div>
          <MetricCard title="Empire Zones">
            <MetricNumber number={`${eoe.zones.getZones(gameManager, gameData.player.empireId).length}/${Object.keys(gameData.zones).length}`} />
          </MetricCard>
          <MetricCard title="Empire Agents">
            <MetricNumber number={ eoe.organizations.getAgents(
                    gameManager,
                    gameData.player.organizationId
                  ).length} />
          </MetricCard>
          <div
            id="empire-agents"
            className="shadow border rounded border-stone-300 w-48 flex flex-col p-2"
          >
            <header className="font-semibold text-center">
              <p>Empire Agents</p>
              <p className="text-3xl">
                {
                  eoe.organizations.getAgents(
                    gameManager,
                    gameData.player.organizationId
                  ).length
                }
              </p>
            </header>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainScreen;

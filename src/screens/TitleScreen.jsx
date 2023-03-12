import { populateActivities, populatePlots } from "empire-of-evil/src/plots";
import Button from "../elements/Button";

const TitleScreen = (props) => {
  const { setScreen, setGameData, activityManager, plotManager } = props;
  return (
    <div className="grid justify-items-center">
      <p className="grid text-4xl w-fit place-self-center my-4">Empire of EVIL</p>
      <div className="bg-stone-700 rounded p-4 m-4">
        <p>An Evil Overlord Simulator by Jedai Saboteur.</p>
      </div>
      <div>

        <button className="p-2 bg-stone-700 hover:bg-stone-800" onClick={()=>{
          setScreen("new-game");
        }}>New Session</button>

        {localStorage.getItem("eoe-save") && (
          <button className="p-2 bg-stone-700 hover:bg-stone-800" onClick={()=>{
            setGameData(JSON.parse(localStorage.getItem("eoe-save")));
            populateActivities(activityManager);
            populatePlots(plotManager);
            setScreen("main");
          }}>Continue Session</button>
        )}
      </div>
    </div>
  );
};

export default TitleScreen;

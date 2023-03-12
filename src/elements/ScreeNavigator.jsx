import { saveGame } from "../actions/dataManagement";
import Button from "./Button";

const screens = [
  { screen: "main", title: "Home" },
  { screen: "world", title: "World" },
  { screen: "intel", title: "Intel" },
  { screen: "personnel", title: "Personnel" },
  { screen: "science", title: "Science" },
  { screen: "plots", title: "Plots" },
];

const ScreenNavigator = ({ setScreen, gameData }) => {
  return (
    <section className="flex flex-col bg-stone-800 text-white">
      <p className="text-xs p-2">WELCOME, OVERLORD</p>
      {screens.map((screen) => (
        <button
          key={screen.screen}
          className="p-2 text-left hover:bg-stone-700 active:bg-stone-800"
          onClick={() => {
            setScreen(screen.screen);
          }}
        >{screen.title}</button>
      ))}
      <button
  
        className="p-2 text-left hover:bg-stone-700 active:bg-stone-800"
        onClick={() => {
          saveGame(gameData)
        }}
      >Save</button>
    </section>
  );
};

export default ScreenNavigator;

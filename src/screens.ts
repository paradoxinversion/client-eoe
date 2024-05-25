import TitleScreen from "./components/screens/Title/TitleScreen";
import NewGameScreen from "./components/screens/NewGame/NewGameScreen";
import MainScreen from "./components/screens/primary/Main/MainScreen";
import IntelScreen from "./components/screens/Intelligence/IntelScreen";
import PersonnelScreen from "./components/screens/primary/Personnel/Personnel";
import ScienceScreen from "./components/screens/primary/Science/ScienceScreen";
import PlotsScreen from "./components/screens/primary/Plots/PlotsScreen";
import WorldScreen from "./components/screens/primary/World/WorldScreen";
import EventsScreen from "./components/screens/Events/EventScreen";
import GameOverScreen from "./components/screens/Endgame/GameOverScreen";
import VictoryScreen from "./components/screens/Endgame/VictoryScreen";
import InfrastructureScreen from "./components/screens/primary/Infrastructure/InfrastructureScreen";
import HelpScreen from "./components/screens/primary/Help/HelpScreen";
import CaptivesScreen from "./components/screens/primary/Captives/CaptivesScreen";
import InfirmaryScreen from "./components/screens/primary/Infirmary/Infirmary";

const screens = {
  title: TitleScreen,
  "new-game": NewGameScreen,
  main: MainScreen,
  intel: IntelScreen,
  personnel: PersonnelScreen,
  science: ScienceScreen,
  plots: PlotsScreen,
  world: WorldScreen,
  events: EventsScreen,
  "game-over": GameOverScreen,
  victory: VictoryScreen,
  infrastructure: InfrastructureScreen,
  help: HelpScreen,
  captives: CaptivesScreen,
  infirmary: InfirmaryScreen,
};

export default screens;

export type GameScreen = keyof typeof screens;

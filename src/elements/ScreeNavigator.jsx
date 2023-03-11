import Button from "./Button";

const screens = [
  { screen: "main", title: "Home" },
  { screen: "world", title: "World" },
  { screen: "intel", title: "Intel" },
  { screen: "personnel", title: "Personnel" },
  { screen: "science", title: "Science" },
  { screen: "plots", title: "Plots" },
];

const ScreenNavigator = ({ setScreen }) => {
  return (
    <section className="flex flex-col w-32 bg-stone-800 text-white">
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
    </section>
  );
};

export default ScreenNavigator;

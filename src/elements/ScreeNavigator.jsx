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
    <section className="flex flex-col">
      {screens.map((screen) => (
        <Button
          key={screen.screen}
          onClick={() => {
            setScreen(screen.screen);
          }}
          buttonText={screen.title}
          style={"mb-4"}
        />
      ))}
    </section>
  );
};

export default ScreenNavigator;

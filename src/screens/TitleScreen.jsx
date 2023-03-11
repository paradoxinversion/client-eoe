import Button from "../elements/Button";

const TitleScreen = (props) => {
  const { setScreen } = props;
  return (
    <div className="justify-center w-full">
      <p className="text-2xl">Empire of EVIL</p>
      <button className="text-center"></button>
      <Button
        onClick={() => {
          setScreen("new-game");
        }}
        buttonText="New Game"
      />
    </div>
  );
};

export default TitleScreen;

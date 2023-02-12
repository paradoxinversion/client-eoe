import Button from "../elements/Button";

const TitleScreen = (props) => {
  const { setScreen } = props;
  return (
    <div>
      <p>Empire of EVIL</p>
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

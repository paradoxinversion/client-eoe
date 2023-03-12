import Button from "../elements/Button";

const TitleScreen = (props) => {
  const { setScreen } = props;
  return (
    <div className="grid justify-items-center">
      <p className="grid text-4xl w-fit place-self-center my-4">Empire of EVIL</p>
      <div className="bg-stone-700 rounded p-4 m-4">
        <p>An Evil Overlord Simulator by Jedai Saboteur.</p>
      </div>
      <button className="p-2 bg-stone-700 hover:bg-stone-800" onClick={()=>{
        setScreen("new-game");
      }}>New Game</button>
    </div>
  );
};

export default TitleScreen;

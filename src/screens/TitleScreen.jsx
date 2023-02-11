import NewGameScreen from "./NewGameScreen";

const TitleScreen = (props) => {
    const {setScreen} = props;
    return (
        <div>
            <p>Empire of EVIL</p>
            <button onClick={()=>{setScreen("new-game")}}>Play</button>
        </div>
    )
}

export default TitleScreen;
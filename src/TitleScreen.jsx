import NewGame from "./NewGame";

const TitleScreen = ({setScreen}) => {
    return (
        <div>
            <p>Empire of EVIL</p>
            <button onClick={()=>setScreen(NewGame)}>Play</button>
        </div>
    )
}

export default TitleScreen;
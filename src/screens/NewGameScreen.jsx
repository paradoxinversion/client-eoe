import { useState } from "react";
import { handleNewGame } from "../actions/gameSetup";

const NewGameScreen = ({setScreen, setGameData}) => {
    const [overlordName, setOverlordName] = useState("")
    const onNewGame = () => {
        console.log()
        setGameData(handleNewGame())
    }
    return (
        <div>
            <p>New Game</p>
            <form>
                <label>EVIL Overlord Name</label>
                <input type="text" name="overlord-name" id="overlord-name" onChange={(e)=>setOverlordName(e.currentTarget.value)} />
            </form>
            <button onClick={async ()=>{
                await onNewGame()
                setScreen('main')
            }}>Go</button>
        </div>
    )
}

export default NewGameScreen;
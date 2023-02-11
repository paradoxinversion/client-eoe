const ScreenNavigator = ({setScreen}) => {
    return (
        <section>
            <button onClick={() => {setScreen("main")}}>Home</button>
            <button onClick={() => {setScreen("intel")}}>Intel</button>
            <button onClick={() => {setScreen("personnel")}}>Personnel</button>
            <button onClick={() => {setScreen("science")}}>Science</button>
            <button onClick={() => {setScreen("plots")}}>Plots</button>
        </section>
    )
}

export default ScreenNavigator;
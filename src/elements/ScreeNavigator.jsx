import Button from "./Button"

const screens = [
    {screen: "main", title: "Home"},
    {screen: "intel", title: "Intel"},
    {screen: "personnel", title: "Personnel"},
    {screen: "science", title: "Science"},
    {screen: "plots", title: "Plots"},
]

const ScreenNavigator = ({setScreen}) => {
    return (
        <section>
            {screens.map(screen => <Button onClick={() => {setScreen(screen.screen)}} buttonText={screen.title} />)}
        </section>
    )
}

export default ScreenNavigator;
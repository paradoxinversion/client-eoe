
import {Box, Button} from "@mui/material";


const ScienceProjectComplete = ({gameManager, currentGameEvent, resolveEvent}) => {
    console.log(currentGameEvent, gameManager, resolveEvent)
    return (
        <Box>
            Science Project Complete
            <Button onClick={() => resolveEvent()}>OK</Button>
        </Box>
    )
}

export default ScienceProjectComplete;;
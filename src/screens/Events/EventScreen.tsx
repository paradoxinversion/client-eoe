import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import EventScreenCombatResults from "../../elements/EventScreens/EventScreenCombatResults";
import EventScreenProceed from "../../elements/EventScreenProceed";
import EventScreenRecruit from "../../elements/EventScreenRecruit";
import MonthlyReportScreen from "../MonthlyReportScreen";
import EventScreenReconZone from "../../elements/EventScreenReconZone";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import { setScreen } from "../../features/screenSlice";
import EventScreenIntruder from "../../elements/EventScreens/Intruder";
import ScienceProjectComplete from "../../elements/EventScreens/ScienceProjectComplete";
import { updateGameData } from "../../actions/dataManagement";
import GameEvent from "empire-of-evil/src/events/GameEvent";
export interface GameEventComponentProps {
  resolveEvent: () => void;
  currentGameEvent: GameEvent;
}

const eventScreenMap = {
  "EVIL Applicant": EventScreenRecruit,
  "Standard Report": EventScreenProceed,
  "Wealth Change": EventScreenProceed,
  "Attack Zone": EventScreenCombatResults,
  "Monthly Report": MonthlyReportScreen,
  "Recon Zone": EventScreenReconZone,
  "Intruder Alert!": EventScreenIntruder,
  "Science Project Complete": ScienceProjectComplete,
};

const EventsScreen = ({ gameManager }) => {
  const { gameData, eventManager: eventQueue } = gameManager;

  const [eventScreen, setEventScreen] = useState(
    eventQueue.getCurrentEvent().eventName
  );
  const [open, setOpen] = useState(true);

  const dispatch = useDispatch();

  // Select the component we need for the ecurrent event
  const CurrentEventComponent = eventScreenMap[eventScreen];

  const resolveEvent = (resolveArgs) => {
    eventQueue.resolveCurrentEvent(gameManager, resolveArgs);
    const resolvedEventData = eventQueue.getCurrentEvent().eventData;
    const updatedGameData = {
      ...gameData,
      ...resolvedEventData.resolution.updatedGameData,
    };
    if (
      updatedGameData.people[gameData.player.overlordId]?.currentHealth <= 0
    ) {
      dispatch(setScreen("game-over"));
    }
    updateGameData(gameManager, updatedGameData);

    if (eventQueue.eventIndex === eventQueue.events.length - 1) {
      eventQueue.clearEvents();

      dispatch(setScreen("main"));
    } else {
      eventQueue.incrementEventIndex();
      setEventScreen(eventQueue.getCurrentEvent().eventName);
    }
  };
  const ce = eventQueue.getCurrentEvent();

  const eventRefElement = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = eventRefElement;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  return (
    <Box component="section">
      <Dialog open={open}>
        <DialogTitle sx={{ minWidth: "500px" }}>{ce.eventName}</DialogTitle>
        <Divider />
        <DialogContent>
          <Box>
            <Typography>{ce.eventText}</Typography>
          </Box>

          <CurrentEventComponent
            currentGameEvent={ce}
            resolveEvent={resolveEvent}
            gameData={gameData}
            gameManager={gameManager}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default EventsScreen;

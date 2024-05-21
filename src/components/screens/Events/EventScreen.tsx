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
import { setScreen } from "../../../features/screenSlice";
import EventScreenIntruder from "../../elements/EventScreens/Intruder";
import ScienceProjectComplete from "../../elements/EventScreens/ScienceProjectComplete";
import { updateGameData } from "../../../actions/dataManagement";
import GameEvent from "empire-of-evil/src/managers/events/GameEvent";
import { addEventLog } from "../../../features/gameLogSlice";
import { eventConfig } from "empire-of-evil/src/gameEvents";
import { managers } from "empire-of-evil";
import EventScreenPetEvent from "../../elements/EventScreens/EventScreenPetEvent";
import EmbedAgents from "../../elements/EventScreens/EmbedAgents";
import RecallEmbeddedAgents from "../../elements/EventScreens/RecallEmbeddedAgents";
import DomesticCombatEncounter from "../../elements/EventScreens/DomesticCombatEncounter";
import Raid from "../../elements/EventScreens/Raid";
export interface GameEventComponentProps {
  resolveEvent: () => void;
  currentGameEvent: GameEvent;
}

const eventScreenMap = {
  recruit: EventScreenRecruit,
  standardReport: EventScreenProceed,
  wealthMod: EventScreenProceed,
  attackZone: EventScreenCombatResults,
  monthlyReport: MonthlyReportScreen,
  reconZone: EventScreenReconZone,
  intruder: EventScreenIntruder,
  projectComplete: ScienceProjectComplete,
  temperTantrum: EventScreenProceed,
  occupationalHazard: EventScreenProceed,
  petEvent: EventScreenPetEvent,
  embedAgents: EmbedAgents,
  recallEmbeddedAgents: RecallEmbeddedAgents,
  domesticCombatEncounter: DomesticCombatEncounter,
  raid: Raid,
};

const EventsScreen = () => {
  const { gameData } = managers.game.GameManager.getInstance();
  const eventQueue = managers.events.GameEventQueue.getInstance();
  const [eventScreen, setEventScreen] = useState(
    eventQueue.getCurrentEvent().type
  );
  const [open, setOpen] = useState(true);

  const dispatch = useDispatch();
  console.log(eventQueue.getCurrentEvent().type, eventScreen);
  // Select the component we need for the ecurrent event
  const CurrentEventComponent =
    eventScreenMap[eventQueue.getCurrentEvent().type];

  const resolveEvent = (resolveArgs) => {
    eventQueue.resolveCurrentEvent(resolveArgs);
    const event = eventConfig[eventQueue.getCurrentEvent().type];
    if (event) {
      let color = "primary";
      dispatch(
        addEventLog({
          text: eventQueue.getCurrentEvent().eventText,
          color,
          icon: eventConfig[eventQueue.getCurrentEvent().type].icon,
        })
      );
    }
    const resolvedEventData = eventQueue.getCurrentEvent().eventData;
    const updatedGameData = {
      ...gameData,
      ...resolvedEventData.resolution.updatedGameData,
    };
    if (
      updatedGameData.people[gameData.player.overlordId]?.derivedAttributes
        .health.currentHealth <= 0
    ) {
      dispatch(setScreen("game-over"));
    }
    updateGameData(updatedGameData);

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

  useEffect(() => {
    console.log("Current Event:", eventQueue.getCurrentEvent());
  }, [eventQueue.eventIndex]);
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
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default EventsScreen;

import { useState } from "react";
import EventScreenCombatResults from "../elements/EventScreenCombatResults";
import EventScreenProceed from "../elements/EventScreenProceed";
import EventScreenRecruit from "../elements/EventScreenRecruit";
import MonthlyReportScreen from "./MonthlyReportScreen";
import Modal from "../elements/Modal";
import EventScreenReconZone from "../elements/EventScreenReconZone";
import { GameManager } from "empire-of-evil";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";

const eventScreenMap = {
  "EVIL Applicant": EventScreenRecruit,
  "Standard Report": EventScreenProceed,
  "Wealth Change": EventScreenProceed,
  "Attack Zone": EventScreenCombatResults,
  "Monthly Report": MonthlyReportScreen,
  "Recon Zone": EventScreenReconZone
};

/**
 * @param {Object} props
 * @param {GameManager} props.gameManager 
 * @returns 
 */
const EventsScreen = ({ gameManager, setScreen }) => {
  const {gameData, eventManager: eventQueue} = gameManager;
  const [eventScreen, setEventScreen] = useState(eventQueue.getCurrentEvent().eventName);
  const CurrentEventComponent = eventScreenMap[eventScreen];

  const resolveEvent = (resolveArgs) => {
    eventQueue.resolveCurrentEvent(gameManager, resolveArgs)
    const resolvedEventData = eventQueue.getCurrentEvent().eventData;
    const updatedGameData = {...gameData, ...resolvedEventData.resolution.updatedGameData}
    if (updatedGameData.people[gameData.player.overlordId]?.currentHealth <= 0){
      setScreen("game-over");
    }
    gameManager.updateGameData(updatedGameData)
    if (eventQueue.eventIndex === eventQueue.events.length - 1) {
      eventQueue.clearEvents();
      
      setScreen("main");
    } else {
      eventQueue.incrementEventIndex();
      setEventScreen(eventQueue.getCurrentEvent().eventName)
    }
  };
  const ce = eventQueue.getCurrentEvent();
  return (
    <Box component="section">
      <Modal>
        <Box component="header">
          <Typography>{ce.eventName}</Typography>
          <Typography>{ce.eventText}</Typography>
        </Box>

        <CurrentEventComponent
          currentGameEvent={ce}
          resolveEvent={resolveEvent}
          gameData={gameData}
          gameManager={gameManager}
        />
      </Modal>
    </Box>
  );
};

export default EventsScreen;

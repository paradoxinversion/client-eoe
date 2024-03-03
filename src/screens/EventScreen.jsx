import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import EventScreenCombatResults from "../elements/EventScreenCombatResults";
import EventScreenProceed from "../elements/EventScreenProceed";
import EventScreenRecruit from "../elements/EventScreenRecruit";
import MonthlyReportScreen from "./MonthlyReportScreen";
import Modal from "../elements/Modal";
import EventScreenReconZone from "../elements/EventScreenReconZone";
import { GameManager } from "empire-of-evil";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { setScreen } from "../features/screenSlice";
import { setNations } from "../features/nationSlice";
import { setGoverningOrganizations } from "../features/governingOrganizationSlice";
import { setZones } from "../features/zoneSlice";
import { setBuildings } from "../features/buildingSlice";
import { setPeople } from "../features/personSlice";

const eventScreenMap = {
  "EVIL Applicant": EventScreenRecruit,
  "Standard Report": EventScreenProceed,
  "Wealth Change": EventScreenProceed,
  "Attack Zone": EventScreenCombatResults,
  "Monthly Report": MonthlyReportScreen,
  "Recon Zone": EventScreenReconZone,
};

/**
 * @param {Object} props
 * @param {GameManager} props.gameManager
 * @returns
 */
const EventsScreen = ({ gameManager }) => {
  const dispatch = useDispatch();
  const { gameData, eventManager: eventQueue } = gameManager;
  const [eventScreen, setEventScreen] = useState(
    eventQueue.getCurrentEvent().eventName
  );
  const [open, setOpen] = useState(true);
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
    gameManager.updateGameData(updatedGameData);
    const {
      governingOrganizations,
      nations,
      zones,
      buildings,
      people
    } = gameManager.gameData
    dispatch(setGoverningOrganizations(governingOrganizations));
    dispatch(setNations(nations));
    dispatch(setZones(zones));
    dispatch(setBuildings(buildings));
    dispatch(setPeople(people));

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
        <DialogTitle>{ce.eventName}</DialogTitle>
        <Divider />
        <DialogContent>
          <Box >
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

import { useState } from "react";
import EventScreenCombatResults from "../elements/EventScreenCombatResults";
import EventScreenProceed from "../elements/EventScreenProceed";
import EventScreenRecruit from "../elements/EventScreenRecruit";
import MonthlyReportScreen from "./MonthlyReportScreen";
const eventScreenMap = {
  "EVIL Applicant": EventScreenRecruit,
  "Standard Report": EventScreenProceed,
  "Wealth Change": EventScreenProceed,
  "Attack Zone": EventScreenCombatResults,
  "Monthly Report": MonthlyReportScreen
};

/**
 * @param {Object} props
 * @param {GameEventQueue} props.eventQueue 
 * @returns 
 */
const EventsScreen = ({ gameData, setScreen, eventQueue, updateGameData }) => {
  const [eventScreen, setEventScreen] = useState(eventQueue.getCurrentEvent().eventName);
  const CurrentEventComponent = eventScreenMap[eventScreen];

  const resolveEvent = (resolveArgs) => {
    eventQueue.resolveCurrentEvent(gameData, resolveArgs)
    const resolvedEventData = eventQueue.getCurrentEvent().eventData;
    const updatedGameData = {...gameData, ...resolvedEventData.resolution.updatedGameData}
    if (updatedGameData.people[gameData.player.overlordId]?.currentHealth <= 0){
      setScreen("game-over");
    }
    updateGameData(updatedGameData);
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
    <section>
      <header className="mb-4">
        <h1>{ce.eventName}</h1>
        <p>{ce.eventText}</p>
      </header>
      <CurrentEventComponent
        currentGameEvent={ce}
        resolveEvent={resolveEvent}
        gameData={gameData}
      />
    </section>
  );
};

export default EventsScreen;

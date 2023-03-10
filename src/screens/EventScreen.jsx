import { useEffect, useState } from "react";
import EventScreenProceed from "../elements/EventScreenProceed";
import EventScreenRecruit from "../elements/EventScreenRecruit";
import EventScreenStandardReport from "../elements/EventScreenStandardReport";
const eventScreenMap = {
  "EVIL Applicant": EventScreenRecruit,
  "Standard Report": EventScreenProceed,
  "Wealth Change": EventScreenProceed
};
const EventsScreen = ({ gameData, setGameData, setScreen, eventQueue }) => {
  const [eventScreen, setEventScreen] = useState(eventQueue.getCurrentEvent().eventName);
  const CurrentEventComponent = eventScreenMap[eventScreen];

  useEffect(()=>{
    if (eventQueue.events.length > 0){
      eventQueue.executeCurrentEvent();
    }
  }, [eventQueue]);

  const resolveEvent = (resolveArgs) => {
    const resolution = eventQueue.resolveCurrentEvent(gameData, resolveArgs);
    setGameData(resolution.updatedGameData);
    if (eventQueue.eventIndex === eventQueue.events.length - 1) {
      eventQueue.clearEvents();
      setScreen("main");
    } else {
      eventQueue.incrementEventIndex();
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
      />
    </section>
  );
};

export default EventsScreen;

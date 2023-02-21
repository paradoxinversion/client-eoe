import { useState } from "react";
import EventScreenRecruit from "../elements/EventScreenRecruit";
const eventScreenMap = {
  "EVIL Applicant": EventScreenRecruit,
};
const EventsScreen = ({ gameData, setGameData, setScreen, eventQueue }) => {
  const [eventIndex, setEventIndex] = useState(0);
  const [eventScreen, setEventScreen] = useState(gameData.events[0].eventName);
  const CurrentEventComponent = eventScreenMap[eventScreen];

  const resolveEvent = (resolveArgs) => {
    const resolution = eventQueue.resolveCurrentEvent(gameData, resolveArgs);
    setGameData(resolution.updatedGameData);
    if (eventQueue.eventIndex === eventQueue.events.length - 1) {
      setScreen("main");
    } else {
      eventQueue.incrementEventIndex();
    }
  };

  return (
    <section>
      <header className="mb-4">
        <h1>{gameData.events[eventIndex].eventName}</h1>
        <p>{gameData.events[eventIndex].eventText}</p>
      </header>
      <CurrentEventComponent
        currentGameEvent={eventQueue.getCurrentEvent()}
        resolveEvent={resolveEvent}
      />
      {/* <button onClick={()=>{
        if (eventIndex === gameData.events.length -1){
          setScreen("main")
        } else{
          setEventIndex(eventIndex++)
        }
      }}>Okay</button> */}
    </section>
  );
};

export default EventsScreen;

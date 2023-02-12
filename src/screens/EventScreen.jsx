import { useState } from "react";

const EventsScreen = ({ gameData, setScreen }) => {
  const [eventIndex, setEventIndex] = useState(0);
  return (
    <section>
      <header>
        <p>{gameData.events[eventIndex].eventName}</p>
        <p>{gameData.events[eventIndex].eventText}</p>
        <button onClick={()=>{
          if (eventIndex === gameData.events.length -1){
            setScreen("main")
          } else{
            setEventIndex(eventIndex++)
          }
        }}>Okay</button>
      </header>
    </section>
  );
};

export default EventsScreen;

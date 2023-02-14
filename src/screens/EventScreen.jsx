import { useEffect } from "react";

const EventsScreen = ({ gameData, setScreen, setGameData }) => {
  const handleEvent = () => {
    const eventResult = gameData.events.executeCurrentEvent();
    const currentEvent = gameData.events.events[gameData.events.eventIndex];
    const eventClass = currentEvent.constructor.name;
    const updatedGameData = JSON.parse(JSON.stringify(gameData));

    if (eventClass === "RecruitEvent") {
      const updatedRecruit = {
        ...currentEvent.recruit,
        agent: eventResult,
      };
      updatedGameData.people[currentEvent.recruit.id] = updatedRecruit;
      setGameData(updatedGameData);
    }
  };

  useEffect(() => {
    handleEvent();
  }, []);

  return (
    <section>
      <header>
        <p>{gameData.events.events[gameData.events.eventIndex].eventName}</p>
        <p>{gameData.events.events[gameData.events.eventIndex].eventText}</p>
        <button
          onClick={() => {
            if (
              gameData.events.eventIndex ===
              gameData.events.events.length - 1
            ) {
              setScreen("main");
            }
          }}
        >
          Okay
        </button>
      </header>
    </section>
  );
};

export default EventsScreen;

import { eventConfig } from "empire-of-evil/src/gameEvents";

const eoe = require("empire-of-evil");
const { Shufflebag } = require("../utilities/shufflebag");

const shufflebag = Shufflebag({
  EvilApplicantEvent: 1,
  // WealthModEvent: 1,
  // nothing: 1,
});
/**
 * Add a set of random events to the event queue
 */
export const prepareRandomEvents = (gameData) => {
  const events = [];
  for (let potentialEvents = 0; potentialEvents < 1; potentialEvents++) {
    const eventType = shufflebag.next();
    let event;
    switch (eventType) {
      case "EvilApplicantEvent":
        try{
          event = eoe.gameEvents.generateEvilApplicantEvent(
            gameData
          );
          
          events.push(event);
        }catch(e){
          console.log(e)
          break;
        }
        break;

      case "WealthModEvent":
        event = eoe.gameEvents.generateWealthMod();
        events.push(event);
        break;
  
      default:
        break;
    }
    
  }
  if (events.length === 0){
    events.push(eoe.gameEvents.generateStandardReportEvent())
  }
  return events;
};


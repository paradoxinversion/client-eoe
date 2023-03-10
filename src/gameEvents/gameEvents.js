import { toDataArray } from "../utilities/dataHelpers";

const eoe = require("empire-of-evil");
const { Shufflebag } = require("../utilities/shufflebag");

const RANDOM_EVENTS = [eoe.gameEvents.EvilApplicantEvent, null];
const shufflebag = Shufflebag({
  EvilApplicantEvent: 1,
  WealthModEvent: 1,
  nothing: 1,
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
        event = eoe.gameEvents.generateEvilApplicantEvent(
          eoe.citizens.getCitizens(toDataArray(gameData.people)),
          gameData.player.organizationId
        );
        events.push(event);
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

  console.log(events);
  return events;
};
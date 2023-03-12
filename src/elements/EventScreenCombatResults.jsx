const EventScreenCombatResults = ({currentGameEvent, resolveEvent}) => {
  return (
    <div>
      <header>
        <p className="text-xl font-bold border-b">Combat Log</p>
      </header>
      <div>
        {currentGameEvent.eventData.combatLog.map(logString => (
          <p>{logString}</p>
        ))}
      </div>
      <button className="p-2" onClick={()=>{resolveEvent()}}>Okay</button>
    </div>
  )
}

export default EventScreenCombatResults;
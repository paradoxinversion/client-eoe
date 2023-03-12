const EventScreenCombatResults = ({currentGameEvent, resolveEvent}) => {
  return (
    <div>
      <header>
        <p className="text-xl font-bold border-b">Combat Log</p>
      </header>
      <div className="h-64 overflow-y-auto">
        {currentGameEvent?.plot?.resolution?.combatLog?.map((logString, index) => (
          <p key={`log-${index}`}>{logString}</p>
        ))}
      </div>
      <button className="p-2" onClick={()=>{resolveEvent()}}>Okay</button>
    </div>
  )
}

export default EventScreenCombatResults;
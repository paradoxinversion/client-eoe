import { useState } from "react";
import Button from "./Button";

/**
 * @param {object} props
 * @param {object} props.currentGameEvent 
 * @param {Function} props.resolveEvent
 * @returns 
 */
const EventScreenRecruit = ({currentGameEvent, resolveEvent}) => {
  const [department, setDepartment] = useState(null);

  const onChange = (event) => {
    setDepartment(event.target.value);
  }

  return (
    <section>
      <section className="mb-4">
        <header>
          <h2>Recruit Details</h2>
        </header>
        <p>{currentGameEvent.recruit.name}</p>
        <p>Combat: {currentGameEvent.recruit.combat}</p>
        <p>Administration: {currentGameEvent.recruit.administration}</p>
        <p>Intelligence: {currentGameEvent.recruit.intelligence}</p>
        <p>Leadership: {currentGameEvent.recruit.leadership}</p>
        <p>Loyalty: {currentGameEvent.recruit.loyalty}?</p>
      </section>

      <section className="mb-4">
        <p>Select a department for this recruit</p>
        <form onChange={onChange}>
          <div>
            <input type="radio" id="recruit-department-trooper" name="recruit-department" value={0}/>
            <label htmlFor="recruit-department-trooper">Henchman</label>
          </div>
          <div>
            <input type="radio" id="recruit-department-administrator" name="recruit-department" value={1}/>
            <label htmlFor="recruit-department-administrator">Administrator</label>  
          </div>
          <div>
            <input type="radio" id="recruit-department-scientist" name="recruit-department" value={2}/>
            <label htmlFor="recruit-department-scientist">Scientist</label>  
          </div>
        </form>
      </section>
      <section className="w-32 flex justify-between">
        <Button
          disabled={department === null}
          buttonText="Accept"
          onClick={()=>{
            resolveEvent({
              resolutionValue: 1,
              data: {
                department
              }
            })
          }}
        />

        <Button 
          buttonText="Deny"
          onClick={()=>{
            resolveEvent({
              resolutionValue: 0
            })
          }}
        />
      </section>
    </section>
  )
}

export default EventScreenRecruit;
import Button from "./Button";

/**
 * @param {object} props
 * @param {object} props.currentGameEvent
 * @param {Function} props.resolveEvent
 * @returns
 */
const EventScreenProceed = ({ resolveEvent }) => {
  return (
    <section>
      <section className="w-32 flex justify-between">
        <Button
          buttonText="Okay"
          onClick={() => {
            resolveEvent();
          }}
        />
      </section>
    </section>
  );
};

export default EventScreenProceed;

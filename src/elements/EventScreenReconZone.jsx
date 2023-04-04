import Button from "./Button";

/**
 * @param {object} props
 * @param {object} props.currentGameEvent
 * @param {Function} props.resolveEvent
 * @returns
 */
const EventScreenReconZone = ({ resolveEvent, currentGameEvent }) => {
  const { intelligenceModifier, success } =
    currentGameEvent.params.plot.resolution.data;
  return (
    <section>
      <p>Mission {success ? "Success" : "Failure"}</p>
      <p>Your recon mission has failed.</p>
      <p>Intelligence modifier: {intelligenceModifier}</p>
      <section className="w-32 flex justify-between">
        <button
          className="btn btn-primary"
          onClick={() => {
            resolveEvent();
          }}
        >
          Okay
        </button>
      </section>
    </section>
  );
};

export default EventScreenReconZone;


/**
 * 
 * @param {Object} props
 * @param {string} props.title
 * @returns 
 */
const MetricCard = ({ title, type, children }) => {
  return (
    <div className="shadow border rounded border-stone-300 w-48 flex flex-col p-2 h-32 justify-center">
      <header className="font-semibold text-center">
        <p>{title}</p>
      </header>
      {children}
    </div>
  );
};

export default MetricCard;
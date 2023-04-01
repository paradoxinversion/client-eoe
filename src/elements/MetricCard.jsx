/**
 * 
 * @param {Object} props
 * @param {string} props.title
 * @returns 
 */
export const MetricCard = ({ title, children }) => {
  return (
    <div className="shadow border rounded border-stone-300 w-48 flex flex-col p-2">
      <header className="font-semibold text-center">
        <p>{title}</p>
        {children}
      </header>
    </div>
  );
};

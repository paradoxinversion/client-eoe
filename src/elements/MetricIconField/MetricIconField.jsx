const MetricIconField = ({ icon, children }) => {
  return (
    <p className="flex items-center">
      {icon}
      {children}
    </p>
  );

};

export default MetricIconField;

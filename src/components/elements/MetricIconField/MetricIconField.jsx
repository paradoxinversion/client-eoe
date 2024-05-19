import { Typography } from "@mui/material";

const MetricIconField = ({ icon, children }) => {
  return (
    <Typography>
      {icon}
      {children}
    </Typography>
  );

};

export default MetricIconField;

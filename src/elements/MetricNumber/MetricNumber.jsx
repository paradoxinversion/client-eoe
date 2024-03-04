import { Typography, Card } from "@mui/material";

const MetricNumber = ({ number, title }) => {
  return (
    <Card sx={{ width: "fit-content", padding: "1rem" }}>
      <Typography variant="body2" align="center">
        {title}
      </Typography>
      <Typography variant="h5" align="center">
        {number}
      </Typography>
    </Card>
  );
};

export default MetricNumber;

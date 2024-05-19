import { Typography, Card } from "@mui/material";
interface MetricNumberProps {
  number: number|string;
  title: string;
}
const MetricNumber = ({ number, title }: MetricNumberProps) => {
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

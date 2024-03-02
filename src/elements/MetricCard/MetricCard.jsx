import { Card, CardContent, Typography } from "@mui/material";
/**
 * 
 * @param {Object} props
 * @param {string} props.title
 * @returns 
 */
const MetricCard = ({ title, type, children }) => {
  return (
    <Card>
      <CardContent>
        <Typography>{title}</Typography>
        {children}
      </CardContent>
    </Card>
  );
};

export default MetricCard;
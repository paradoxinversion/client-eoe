import { Divider, Grid, Paper, Typography } from "@mui/material";

const HeaderGridItem = ({
  title,
  content,
  span,
}: {
  title: string;
  content: string | number;
  span?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}) => {
  return (
    <Grid
      item
      xs={span?.xs || undefined}
      sm={span?.sm || undefined}
      md={span?.md || undefined}
      lg={span?.lg || undefined}
      xl={span?.xl || undefined}
      sx={{ height: "100%" }}
    >
      <Paper>
        <Typography variant="body2" color="GrayText" sx={{ padding: 1 }}>
          {title}
        </Typography>
        <Divider />
        <Typography variant="body2" sx={{ padding: 1 }}>
          {content}
        </Typography>
      </Paper>
    </Grid>
  );
};

export default HeaderGridItem;

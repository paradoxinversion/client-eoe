import { Grid, Typography } from "@mui/material";

const HeaderGridItem = ({
  title,
  content,
}: {
  title: string;
  content: string | number;
}) => {
  return (
    <Grid item>
      <Typography variant="body2" color="GrayText">
        {title}
      </Typography>
      <Typography variant="body2">{content}</Typography>
    </Grid>
  );
};

export default HeaderGridItem;

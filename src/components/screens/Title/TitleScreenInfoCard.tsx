import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Divider,
  CardActions,
} from "@mui/material";

type TitleScreenInfoCardProps = {
  title: string;
  content: string;
};

const TitleScreenInfoCard = (props: TitleScreenInfoCardProps) => {
  const { title, content } = props;
  return (
    <Grid item xs={3} md={1}>
      <Card sx={{ maxWidth: 345, height: 300, overflowY: "scroll" }}>
        <CardHeader title={title} />
        <Divider />
        <CardContent>{content}</CardContent>
      </Card>
    </Grid>
  );
};

export default TitleScreenInfoCard;

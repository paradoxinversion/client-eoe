import { Stack, Typography } from "@mui/material";

const IconContent = ({
  Icon,
  content,
}: {
  Icon: any;
  content: string | number;
}) => {
  return (
    <Stack direction="row" spacing={1}>
      {Icon && <Icon />}
      <Typography>{content}</Typography>
    </Stack>
  );
};

export default IconContent;

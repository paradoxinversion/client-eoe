import { Hidden, IconProps, Stack, Tooltip, Typography } from "@mui/material";

const IconContent = ({
  Icon,
  content,
  label,
  fontSize,
}: {
  Icon: any;
  content: string | number;
  label?: string;
  fontSize?: IconProps["fontSize"];
}) => {
  return (
    <Stack direction="row" spacing={1}>
      <Tooltip title={label}>{Icon && <Icon fontSize={fontSize} />}</Tooltip>
      <Hidden mdDown>
        <Typography>{label}</Typography>
      </Hidden>
      <Typography variant="body2">{content}</Typography>
    </Stack>
  );
};

export default IconContent;

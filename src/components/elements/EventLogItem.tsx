import {
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  Dangerous as DangerousIcon,
  Done as DoneIcon,
  TravelExplore as TravelExploreIcon,
  Info as InfoIcon,
  ContactPage as ContactPageIcon,
  Warning as WarningIcon,
  Paid as PaidIcon,
} from "@mui/icons-material";

type EventLogItemProps = {
  text: string;
  color: string;
  icon: string;
};
const EventLogItem = (props: EventLogItemProps) => {
  const { text, color, icon } = props;
  let Icon = null;
  switch (icon) {
    case "travel-explore":
      Icon = TravelExploreIcon;
      break;
    case "dangerous":
      Icon = DangerousIcon;
      break;
    case "info":
      Icon = InfoIcon;
      break;
    case "contact-page":
      Icon = ContactPageIcon;
      break;
    case "warning":
      Icon = WarningIcon;
      break;
    case "payment":
      Icon = PaidIcon;
      break;
    default:
      break;
  }
  return (
    <>
      <ListItem divider>
        {Icon && (
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
        )}
        <ListItemText
          primary={text}
          secondary={new Date(Date.now()).toDateString()}
        />
      </ListItem>
    </>
  );
};

export default EventLogItem;

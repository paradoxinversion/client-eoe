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
const EventLogItem = ({ text, color, icon }) => {
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
    case "paid":
      Icon = PaidIcon;
      break;
    default:
      break;
  }
  return (
    <>
      <ListItem>
        {Icon && (
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
        )}
        <ListItemText primary={text} />
      </ListItem>
      <Divider />
    </>
  );
};

export default EventLogItem;

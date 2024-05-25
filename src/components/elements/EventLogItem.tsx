import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import {
  Dangerous as DangerousIcon,
  Done as DoneIcon,
  TravelExplore as TravelExploreIcon,
  Info as InfoIcon,
  ContactPage as ContactPageIcon,
  Warning as WarningIcon,
  Paid as PaidIcon,
} from "@mui/icons-material";
import { GameLogEvent } from "empire-of-evil/src/managers/game/GameManager";

type EventLogItemProps = GameLogEvent;
const EventLogItem = (props: EventLogItemProps) => {
  console.log(props);
  const { text, color, icon, date } = props;
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
        <ListItemText primary={text} secondary={date} />
      </ListItem>
    </>
  );
};

export default EventLogItem;

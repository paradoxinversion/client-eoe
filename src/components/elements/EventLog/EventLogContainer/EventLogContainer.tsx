import { Box, List, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import EventLogItem from "../../EventLogItem";
import { GameLogEvent } from "empire-of-evil/src/managers/game/GameManager";
type EventLogContainerProps = {
  events: GameLogEvent[];
};
const EventLogContainer = ({ events }: EventLogContainerProps) => {
  // Reverse the events so the most recent is at the top

  return (
    <Box>
      <Box component="header" padding={1}>
        <Typography variant="h6">Recent Events</Typography>
      </Box>
      <List>
        {events.length > 0 ? (
          events.map((event, index) => {
            return (
              <EventLogItem
                key={index}
                text={event.text}
                color={event.color}
                icon={event.icon}
                date={event.date}
              />
            );
          })
        ) : (
          <EventLogItem text="No events" color="primary" icon="info" />
        )}
      </List>
    </Box>
  );
};

export default EventLogContainer;

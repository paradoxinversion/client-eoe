import { Box, List, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { GameManager } from "empire-of-evil";
import EventLogItem from "../../EventLogItem";

const EventLogContainer = () => {
  // Reverse the events so the most recent is at the top
  const events = useAppSelector((state) => state.gameLog.events.reverse());

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

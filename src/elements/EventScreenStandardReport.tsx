import { useState } from "react";
import { Box, Button, DialogTitle, Divider, Toolbar } from "@mui/material";

/**
 * @param {object} props
 * @param {object} props.currentGameEvent
 * @param {Function} props.resolveEvent
 * @returns
 */
const EventScreenStandardReport = ({ resolveEvent }) => {
  return (
    <Box>
      <Divider />
      <Button
        onClick={() => {
          resolveEvent();
        }}
      >
        Okay
      </Button>
    </Box>
  );
};

export default EventScreenStandardReport;

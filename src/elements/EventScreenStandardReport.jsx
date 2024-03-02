import { useState } from "react";
import {Box, Button} from "@mui/material";

/**
 * @param {object} props
 * @param {object} props.currentGameEvent
 * @param {Function} props.resolveEvent
 * @returns
 */
const EventScreenStandardReport = ({ resolveEvent }) => {
  return (
    <Box>
      <Button
        buttonText="Okay"
        onClick={() => {
          resolveEvent();
        }}
      />
    </Box>
  );
};

export default EventScreenStandardReport;

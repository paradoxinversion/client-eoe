import {
  getAgents,
  getAgentSubordinates,
} from "empire-of-evil/src/organization";
import { useState } from "react";
import { toDataArray } from "../utilities/dataHelpers";
import {
  Box,
  Button,
  Typography,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Datagrid from "react-data-grid";
const recruitGridColumns = [
  { key: "attribute", name: "" },
  { key: "value", name: "" },
];
/**
 * @param {object} props
 * @param {object} props.currentGameEvent
 * @param {Function} props.resolveEvent
 * @param {import("empire-of-evil/src/typedef").GameData} props.gameData
 * @returns
 */
const EventScreenRecruit = ({
  gameManager,
  currentGameEvent,
  resolveEvent,
}) => {
  const { gameData } = gameManager;
  const [department, setDepartment] = useState(null);
  const [commander, setCommander] = useState(null);
  const onChange = (event) => {
    setDepartment(event.target.value);
  };
  const onCommanderSelect = (event) => {
    setCommander(event.target.value);
  };
  return (
    <Box component="section">
      <Box component="section">
        <Box component="header">
          <Typography>Recruit Details</Typography>
        </Box>
        <Box xs={{ height: 100 }}>
          <Datagrid
            style={{ height: "auto" }}
            columns={recruitGridColumns}
            rows={[
              {
                attribute: "Combat",
                value: currentGameEvent.params.recruit?.basicAttributes.combat,
              },
              {
                attribute: "Administration",
                value:
                  currentGameEvent.params.recruit?.basicAttributes
                    .administration,
              },
              {
                attribute: "Intelligence",
                value:
                  currentGameEvent.params.recruit?.basicAttributes.intelligence,
              },
              {
                attribute: "Leadership",
                value:
                  currentGameEvent.params.recruit?.basicAttributes.leadership,
              },
              {
                attribute: "Loyalty",
                value: `${currentGameEvent.params.recruit?.intelAttributes.loyalty}?`,
              },
            ]}
          />
        </Box>
      </Box>

      <section className="mb-4">
        <p className="text-lg border-b mb-4">
          Select a department for this recruit
        </p>
        <FormControl className="grid grid-cols-3 gap-2" onChange={onChange}>
          <RadioGroup row name="recruit-department">
            <FormControlLabel value={0} control={<Radio />} label="Henchman" />
            <FormControlLabel
              value={1}
              control={<Radio />}
              label="Administrator"
            />
            <FormControlLabel value={2} control={<Radio />} label="Scientist" />
          </RadioGroup>
        </FormControl>
        <p className="text-lg border-b mb-4">Commander</p>
        <FormControl name="recruit-commander" onChange={onCommanderSelect}>
          <RadioGroup className="flex flex-wrap">
            {getAgents(gameManager, gameData.player.organizationId).map(
              (agent) => {
                const subordinates = getAgentSubordinates(gameManager, agent);
                return (
                  <FormControlLabel
                    value={agent.id}
                    control={<Radio />}
                    label={`${agent.name} (${subordinates.length}/${agent.basicAttributes.leadership})`}
                    disabled={subordinates.length === agent.leadership}
                  />
                );
              }
            )}
          </RadioGroup>
        </FormControl>
      </section>
      <Box className="w-32 flex justify-between">
        <Button
          className="btn btn-confirm"
          disabled={department === null || commander === null}
          onClick={() => {
            resolveEvent({
              resolutionValue: 1,
              data: {
                department,
                commander,
              },
            });
          }}
        >
          Accept
        </Button>
        <Button
          className="btn btn-cancel disabled:bg-stone-400"
          onClick={() => {
            resolveEvent({
              resolutionValue: 0,
            });
          }}
        >
          {" "}
          Deny
        </Button>
      </Box>
    </Box>
  );
};

export default EventScreenRecruit;

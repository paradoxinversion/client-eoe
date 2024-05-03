import { getAgentSubordinates } from "empire-of-evil/src/organization";
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
  Grid,
  Chip,
  Paper,
} from "@mui/material";
import {
  LocalPolice as LocalPoliceIcon,
  Business as BusinessIcon,
} from "@mui/icons-material";
import Datagrid from "react-data-grid";
import { getPeople } from "empire-of-evil/src/actions/people";
import HeaderGridItem from "./HeaderGridItem";
import { GameManager } from "empire-of-evil";
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
const EventScreenRecruit = ({ currentGameEvent, resolveEvent }) => {
  const { gameData } = GameManager.getInstance();
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
        <Box sx={{ height: 100 }}>
          <Grid container padding="1rem" spacing="1rem">
            <HeaderGridItem
              title="Combat"
              content={currentGameEvent.params.recruit?.skills.combat}
            />
            <HeaderGridItem
              title="Administration"
              content={currentGameEvent.params.recruit?.skills.administration}
            />
            <HeaderGridItem
              title="Intelligence"
              content={
                currentGameEvent.params.recruit?.standardAttributes.intelligence
              }
            />
            <HeaderGridItem
              title="Leadership"
              content={currentGameEvent.params.recruit?.skills.leadership}
            />
            <HeaderGridItem
              title="Loyalty"
              content={`${currentGameEvent.params.recruit?.intelAttributes.loyalty}?`}
            />
          </Grid>
        </Box>
      </Box>

      <section className="mb-4">
        <Box>Select a department for this recruit</Box>
        <Box>
          <Paper sx={{ padding: "1rem" }}>
            <FormControl onChange={onChange}>
              <RadioGroup row name="recruit-department">
                <FormControlLabel
                  value={"troop"}
                  control={<Radio />}
                  label="Henchman"
                />
                <FormControlLabel
                  value={"administrator"}
                  control={<Radio />}
                  label="Administrator"
                />
                <FormControlLabel
                  value={"scientist"}
                  control={<Radio />}
                  label="Scientist"
                />
              </RadioGroup>
            </FormControl>
          </Paper>
        </Box>
        <p className="text-lg border-b mb-4">Commander</p>
        <Paper sx={{ padding: "1rem" }}>
          <FormControl onChange={onCommanderSelect}>
            <RadioGroup row sx={{ overflowY: "scroll", height: "100px" }}>
              {getPeople({
                personFilter: {
                  organizationId: gameData.player.organizationId,
                },
                agentFilter: { agentsOnly: true },
              }).map((agent) => {
                const subordinates = getAgentSubordinates(agent);
                return (
                  <FormControlLabel
                    value={agent.id}
                    control={<Radio />}
                    label={`${agent.name} (${subordinates.length}/${agent.skills.leadership})`}
                    disabled={subordinates.length === agent.skills.leadership}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        </Paper>
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

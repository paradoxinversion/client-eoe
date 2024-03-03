import { getAgents, getControlledZones } from "empire-of-evil/src/organization";
import { Plot, PlotManager } from "empire-of-evil/src/plots";
import { useState } from "react";
import {useSelector} from 'react-redux'
import { toDataArray } from "../utilities/dataHelpers";
import { GameManager } from "empire-of-evil";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Typography,
  Radio,
  RadioGroup,
  Chip,
  Stack
} from "@mui/material";
/**
 *
 * @param {Object} props
 * @param {GameManager} props.gameManager
 * @param {PlotManager} props.plotManager
 * @returns
 */
const AttackZonePlot = ({ gameManager, cb }) => {
  const people = useSelector(state => state.people);
  const { gameData, plotManager } = gameManager;
  const [nation, setNation] = useState(null);
  const [zone, setZone] = useState(null);
  const nations = toDataArray(gameData.nations).filter(
    (nation) => nation.organizationId !== gameData.player.organizationId
  );
  const [attackers, setAttackers] = useState([]);

  const preparePlot = () => {
    const plotParams = {
      zone: {
        id: zone.id,
        organizationId: zone.organizationId,
      },
      participants: attackers,
    };
    const plot = new Plot("Attack Zone", "attack-zone", plotParams);
    plotManager.addPlot(plot);
  };

  /**
   *
   * @param {Event} e
   * @param {import("empire-of-evil/src/typedef").Person} agent
   */
  const onUpdateAttackers = (e, agent) => {
    
      if (!attackers.includes(agent.id)) {
        const updatedAttackers = JSON.parse(JSON.stringify(attackers));
        updatedAttackers.push(agent.id);
        setAttackers(updatedAttackers);
      } else {
        const updatedAttackers = JSON.parse(JSON.stringify(attackers));
        setAttackers(
          updatedAttackers.filter((person) => person !== agent.id)
        );
      }
    
  };
  return (
    <Box className="overflow-y-auto">
      <Typography variant="h4">Attack Zone</Typography>
        <Box>
          <Typography>Select a Nation</Typography>
        </Box>
        <Divider />
        <RadioGroup className="flex flex-wrap">
          {nations.map((n) => {
            return (
              <FormControlLabel
                name="nation-select"
                control={<Radio />}
                label={n.name}
                onClick={() => setNation(n)}
              />
            );
          })}
        </RadioGroup>

        {nation && (
          <>
            <Box>
              <Typography>
                Select the zone for this mission
              </Typography>
            </Box>
            <Divider />
            <RadioGroup row>
              {getControlledZones(gameManager, nation.organizationId).map(
                (zone) => (
                  <FormControlLabel
                    value={zone}
                    name="zone-select"
                    control={<Radio />}
                    label={zone.name}
                    onClick={() => setZone(zone)}
                  />
                )
              )}
            </RadioGroup>
          </>
        )}

        {zone && (
          <Box>
            <Box component='header'>
              <Typography>
                Select the Agents attending this mission
              </Typography>
              <Typography variant='caption'>
                *Agents attending this mission may suffer loss of life.
              </Typography>
            </Box>
            <Divider />
            <Stack direction='row' spacing={1} padding={1}>
              {getAgents(gameManager, gameData.player.organizationId)
                .filter(
                  (agent) =>
                    agent.agent.department === 0 || agent.agent.department === 3
                )
                .map((agent) => (
                  <Chip label={agent.name} onClick={(e) => {
                    onUpdateAttackers(e, agent);
                  }} />
                ))}
            </Stack>
            <Divider />
            <Box>
              <Typography>Selected Agents</Typography>
             
             
              <Stack direction={'row'} spacing={1}>
                {attackers.map((agentId) => (
                  <Chip label={people[agentId].name}></Chip>
                ))}
              </Stack>
            </Box>
            <Box component='footer'>
             
            </Box>
          </Box>
        )}
        <Button
          onClick={(e) => {
            e.preventDefault();
            preparePlot();
            cb();
          }}
        >
          Done
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            cb();
          }}
        >
          Cancel
        </Button>
    </Box>
  );
};

export default AttackZonePlot;

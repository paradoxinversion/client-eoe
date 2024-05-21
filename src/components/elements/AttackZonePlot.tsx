import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Chip,
  Stack,
} from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { managers, actions } from "empire-of-evil";
import { Nation } from "empire-of-evil/src/types/interfaces/entities";

const AttackZonePlot = ({ cb }) => {
  const people = useAppSelector((state) => state.people);
  const { gameData, plotManager } = GameManager.getInstance();
  const [nation, setNation] = useState(null);
  const [zone, setZone] = useState(null);
  const nations = Object.values<Nation>(gameData.nations).filter(
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
    const plot = new Plot("Attack Zone", "attack-zone", plotParams, {});
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
      setAttackers(updatedAttackers.filter((person) => person !== agent.id));
    }
  };
  return (
    <>
      {/* <Typography variant="h4">Attack Zone</Typography> */}
      <DialogTitle sx={{ width: "500px" }}>Attack Zone</DialogTitle>
      <DialogContent>
        <Box>
          <Typography>Select a Nation</Typography>
        </Box>
        <Divider />
        <Stack direction="row" spacing={1} padding={1}>
          {nations.map((n) => {
            return (
              <Chip
                name="nation-select"
                // control={<Radio />}
                component={"button"}
                label={n.name}
                onClick={() => setNation(n)}
                variant={nation?.name === n.name ? "outlined" : "filled"}
              />
            );
          })}
        </Stack>
        {nation && (
          <>
            <Box>
              <Typography>Select the zone for this mission</Typography>
            </Box>
            <Divider />
            <Stack direction="row" spacing={1} padding={1}>
              {actions.zones
                .getZones({
                  organizationId: nation.organizationId,
                })
                .map((selectdZone) => (
                  <Chip
                    component={"button"}
                    // value={selectdZone}
                    name="zone-select"
                    // control={<Radio />}
                    label={selectdZone.name}
                    onClick={() => setZone(selectdZone)}
                    variant={
                      zone?.name === selectdZone.name ? "outlined" : "filled"
                    }
                  />
                ))}
            </Stack>
          </>
        )}

        {zone && (
          <Box>
            <Box component="header">
              <Typography>Select the Agents attending this mission</Typography>
              <Typography variant="caption">
                *Agents attending this mission may suffer loss of life.
              </Typography>
            </Box>
            <Divider />
            <Stack direction="row" spacing={1} padding={1}>
              {actions.people
                .getPeople({
                  personFilter: {
                    organizationId: gameData.player.organizationId,
                  },
                  agentFilter: { agentsOnly: true, excludeParticipants: true },
                })
                .filter(
                  (agent) =>
                    agent.agent.department === "troop" ||
                    agent.agent.department === "overlord"
                )
                .map((agent) => (
                  <Chip
                    label={agent.name}
                    onClick={(e) => {
                      onUpdateAttackers(e, agent);
                    }}
                    variant={
                      attackers.includes(agent.id) ? "outlined" : "filled"
                    }
                  />
                ))}
            </Stack>
            <Divider />
            <Box>
              <Typography>Selected Agents</Typography>

              <Stack direction={"row"} spacing={1}>
                {attackers.map((agentId) => (
                  <Chip label={people[agentId].name}></Chip>
                ))}
              </Stack>
            </Box>
            <Box component="footer"></Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
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
      </DialogActions>
    </>
  );
};

export default AttackZonePlot;

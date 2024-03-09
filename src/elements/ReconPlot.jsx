import { getAgents, getControlledZones } from "empire-of-evil/src/organization";
import { Plot } from "empire-of-evil/src/plots";
import { useState } from "react";
import { toDataArray } from "../utilities/dataHelpers";
import {
  Box,
  Button,
  CardContent,
  Chip,
  DialogActions,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";

/**
 *
 * @param {Object} props
 * @param {import("empire-of-evil/src/typedef").GameData} props.gameData
 */
const ReconPlot = ({ gameManager, cb }) => {
  const { gameData, plotManager } = gameManager;
  const [nation, setNation] = useState(null);
  const [zone, setZone] = useState(null);
  const [participants, setParticipants] = useState([]);
  const nations = toDataArray(gameData.nations).filter(
    (nation) => nation.organizationId !== gameData.player.organizationId
  );
  const preparePlot = () => {
    const plotParams = {
      zoneId: zone.id,
      participants,
    };
    const plot = new Plot("Recon Zone", "recon-zone", plotParams);
    plotManager.addPlot(plot);
  };
  const onUpdateParticipants = (e, agent) => {
    if (!participants.includes(agent.id)) {
      const updatedParticipants = [...participants];
      updatedParticipants.push(agent.id);
      setParticipants(updatedParticipants);
    } else {
      if (participants.includes(agent.id)) {
        const updatedParticipants = [...participants];
        setParticipants(
          updatedParticipants.filter((person) => person !== agent.id)
        );
      }
    }

  };
  return (
    <>
      <DialogTitle>Execute Reconnaisance Operation</DialogTitle>
      <CardContent sx={{height: "500px"}}>
        <Typography>
          Send agents for covert intelligence-gathering in a foreign zone.
        </Typography>
        <div>
          <Box>
            <Typography>Select a Nation</Typography>
          </Box>
          <Stack direction="row" spacing={1} padding={1}>
            {nations.map((n) => {
              return (
                <Chip
                  label={n.name}
                  type={"radio"}
                  name="nation-select"
                  id={`nation-select-${n.id}`}
                  variant={nation?.id === n.id ? "outlined" : "filled"}
                  onClick={() => {
                    setNation(n);
                  }}
                />
              );
            })}
          </Stack>
          {nation && (
            <div>
              <Box component={"header"}>
                <Typography>Select the zone for this mission</Typography>
              </Box>
              <Stack direction="row" spacing={1} padding={1}>
                {getControlledZones(gameManager, nation.organizationId).map(
                  (selectedZone) => (
                    <Chip
                      label={selectedZone.name}
                      name="zone-select"
                      id={`zone-select-${selectedZone.id}`}
                      variant={
                        zone?.id === selectedZone.id ? "outlined" : "filled"
                      }
                      onClick={(e) => {
                        setZone(selectedZone);
                      }}
                    />
                  )
                )}
              </Stack>
            </div>
          )}
          {zone && (
            <div className="mb-4">
              <header>
                <p className="text-lg border-b mb-4">
                  Select the Agents attending this mission.
                </p>
              </header>
              <Stack direction="row" spacing={1} padding={1}>
                {getAgents(gameManager, gameData.player.organizationId)
                  .filter(
                    (agent) =>
                      agent.agent.department === 0 ||
                      agent.agent.department === 3
                  )
                  .map((selectedAgent) => (
                    <Chip
                      label={selectedAgent.name}
                      type={"checkbox"}
                      id={`agent-select-${selectedAgent.id}`}
                      variant={
                        participants.includes(selectedAgent.id) ? 'outlined' : 'filled'
                      }
                      onClick={(e) => {
                        onUpdateParticipants(e, selectedAgent);
                      }}
                    />
                  ))}
              </Stack>
              <div>
                <p className="text-lg border-b mb-4">Selected Agents</p>
                <Stack direction="row" spacing={1} padding={1}>
                  {participants.map((agent) => (
                    <Chip
                      label={gameData.people[agent].name}
                      key={`attackers-${agent}`}
                      className="shadow-md rounded p-2"
                    />
                  ))}
                </Stack>
              </div>
              <footer>
                <p className="text-xs">
                  *Agents attending this mission may suffer loss of life.
                </p>
              </footer>
            </div>
          )}
        </div>
      </CardContent>
      <DialogActions>
        <Button
          disable={!nation || !zone}
          onClick={(e) => {
            e.preventDefault();
            preparePlot();
            cb();
          }}
        >
          Done
        </Button>
        <Button
          disable={!nation || !zone}
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

export default ReconPlot;

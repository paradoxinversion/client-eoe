import { getAgents, getControlledZones } from "empire-of-evil/src/organization";
import { useState } from "react";
import { toDataArray } from "../utilities/dataHelpers";
import {
  Box,
  Button,
  CardContent,
  Chip,
  DialogActions,
  DialogTitle,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { people } from "empire-of-evil/src/actions";
import Plot from "empire-of-evil/src/plots/Plot";
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
    const plot = new Plot(
      "Recon Zone",
      "recon-zone",
      {
        targetZone: zone.id,
        participants,
      },
      {
        surrender: true,
      }
    );
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
      <CardContent sx={{ height: "500px" }}>
        <Typography>
          Send agents for covert intelligence-gathering in a foreign zone.
        </Typography>
        <Box padding="1" marginBottom="1rem">
          <Box marginBottom="1rem">
            <Typography>Select a Nation</Typography>
          </Box>
          <Paper sx={{ marginBottom: "1rem" }}>
            <Grid container spacing={1} padding={1}>
              {nations.map((n) => {
                return (
                  <Grid item>
                    <Chip
                      label={n.name}
                      // type={"radio"}
                      // name="nation-select"
                      // id={`nation-select-${n.id}`}
                      variant={nation?.id === n.id ? "outlined" : "filled"}
                      onClick={() => {
                        setNation(n);
                      }}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Paper>
          {nation && (
            <div>
              <Box component={"header"}>
                <Typography>Select the zone for this mission</Typography>
              </Box>
              <Stack direction="row" spacing={1} padding={1}>
                {getControlledZones(gameManager, nation.organizationId).map(
                  (selectedZone) => (
                    <Chip
                      component={"button"}
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
              <Paper>
                <Grid
                  container
                  spacing={1}
                  rowSpacing={1}
                  sx={{
                    overflowY: "scroll",
                    padding: "0.5rem",
                    maxHeight: "150px",
                  }}
                >
                  {people
                    .getPeople(gameManager, {
                      excludeDeceased: true,
                      excludePersonnel: true,
                      excludeCaptured: true,
                      agentFilter: {
                        agentsOnly: true,
                        department: -1,
                      },
                    })
                    .filter(
                      (agent) =>
                        agent.agent.department === 0 ||
                        agent.agent.department === 3
                    )
                    .map((selectedAgent) => (
                      <Grid item>
                        <Chip
                          label={selectedAgent.name}
                          id={`agent-select-${selectedAgent.id}`}
                          variant={
                            participants.includes(selectedAgent.id)
                              ? "outlined"
                              : "filled"
                          }
                          onClick={(e) => {
                            onUpdateParticipants(e, selectedAgent);
                          }}
                        />
                      </Grid>
                    ))}
                </Grid>
              </Paper>
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
        </Box>
      </CardContent>
      <DialogActions>
        <Button
          disabled={!nation || !zone}
          onClick={(e) => {
            e.preventDefault();
            preparePlot();
            cb();
          }}
        >
          Done
        </Button>
        <Button
          disabled={!nation || !zone}
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

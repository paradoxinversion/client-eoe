import { useState } from "react";
import { toDataArray } from "../utilities/dataHelpers";
import {
  Box,
  Button,
  CardContent,
  Chip,
  DialogActions,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { people } from "empire-of-evil/src/actions";
import Plot from "empire-of-evil/src/plots/Plot";
import { getZones } from "empire-of-evil/src/actions/zones";
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
  const [plotParams, setPlotParams] = useState({
    surrender: true,
  });
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
      plotParams
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

  const handleParams = (e) => {
    const { name } = e.target;
    let value = e.target.value;
    if (value === "true") {
      value = true;
    } else if (value === "false") {
      value = false;
    }

    setPlotParams({
      ...plotParams,
      [name]: value,
    });
    console.log(plotParams);
  };
  return (
    <>
      <DialogTitle>Execute Reconnaisance Operation</DialogTitle>
      <CardContent sx={{ height: "500px", overflowY: "scroll" }}>
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
            <Box>
              <Box component={"header"}>
                <Typography>Select the zone for this mission</Typography>
              </Box>
              <Paper>
                <Grid container spacing={1} padding={1}>
                  {getZones(gameManager, {
                    organizationId: nation.organizationId,
                  }).map((selectedZone) => (
                    <Grid item>
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
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Box>
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
              <Box>
                <Typography>
                  There is a possibility agents on this mission will be detected
                  by enemy counterintelligence. If caught, how should they
                  proceed?
                </Typography>
                <FormControl>
                  <RadioGroup
                    name="surrender"
                    value={plotParams.surrender}
                    onChange={handleParams}
                  >
                    <Tooltip
                      title="Agents will surrender if caught by enemy counterintelligence."
                      placement="right"
                    >
                      <FormControlLabel
                        value={true}
                        control={<Radio />}
                        label="Surrender"
                      />
                    </Tooltip>
                    <Tooltip
                      title="Agents will engage enemy counterintelligence if caught."
                      placement="right"
                    >
                      <FormControlLabel
                        value={false}
                        control={<Radio />}
                        label="Engage"
                      />
                    </Tooltip>
                  </RadioGroup>
                </FormControl>
              </Box>
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

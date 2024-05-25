import React, { useState } from "react";
import {
  Box,
  Button,
  CardContent,
  Checkbox,
  Chip,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { managers, actions } from "empire-of-evil";
import {
  Nation,
  Person,
  Zone,
} from "empire-of-evil/src/types/interfaces/entities";
import NationSelector from "./Selectors/NationSelector/NationSelector";
import ZoneSelector from "./Selectors/ZoneSelector/ZoneSelector";
import AgentSelector from "./Selectors/AgentSelector/AgentSelector";

export type ReconPlotProps = {
  onClose: () => void;
};
const ReconPlot = ({ onClose }: ReconPlotProps) => {
  const { gameData } = managers.game.GameManager.getInstance();
  const [nation, setNation] = useState<Nation | null>(null);
  const [zone, setZone] = useState<Zone | null>(null);
  const [participants, setParticipants] = useState<string[]>([]);
  const [plotParams, setPlotParams] = useState({
    surrender: true,
    useDrones: false,
  });
  const nations = Object.values(gameData.nations).filter(
    (nation) => nation.organizationId !== gameData.player.organizationId
  );
  const preparePlot = () => {
    if (zone) {
      managers.plots.plotFunctions.recon.generateReconPlot({
        participants,
        targetZone: zone.id,
        ...plotParams,
      });
    }
  };
  const onUpdateParticipants = (agent: Person) => {
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

  const handleParams = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    let value = e.target.value;
    const boolVal = value === "true" ? true : false;

    setPlotParams({
      ...plotParams,
      [name]: boolVal,
    });
    console.log(plotParams);
  };

  return (
    <>
      <DialogTitle>Execute Reconnaisance Operation</DialogTitle>
      <DialogContent
        sx={{
          height: screen.height * 0.5,
          overflowY: "scroll",
          padding: "1rem",
        }}
      >
        <Typography>
          Send agents for covert intelligence-gathering in a foreign zone.
        </Typography>
        <Box padding="1">
          <NationSelector
            nations={nations}
            onSelectNation={setNation}
            selectedNation={nation}
            headerText="Select the nation for this mission"
          />
          {nation && (
            <ZoneSelector
              zones={actions.zones.getZones({
                organizationId: nation.organizationId,
              })}
              onSelectZone={setZone}
              selectedZone={zone}
              headerText="Select the zone for this mission"
            />
          )}
          {zone && (
            <Box>
              <FormControl>
                <Tooltip
                  title="Utilize drones for intelligence gathering"
                  placement="right"
                >
                  <FormControlLabel
                    name="useDrones"
                    value={plotParams.useDrones}
                    control={
                      <Checkbox
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          e.target.checked = !plotParams.useDrones;
                          setPlotParams({
                            ...plotParams,
                            useDrones: !plotParams.useDrones,
                          });
                        }}
                      />
                    }
                    label="Use Drones"
                  />
                </Tooltip>
              </FormControl>
              {plotParams.useDrones ? (
                <Box>
                  <Typography>
                    Drones will be used for intelligence gathering. No agents
                    are required.
                  </Typography>
                  <Typography>
                    This will increase the cost of the operation.
                  </Typography>
                </Box>
              ) : (
                <>
                  <AgentSelector
                    agents={actions.people.getPeople({
                      personFilter: {
                        excludeDeceased: true,
                        excludePersonnel: true,
                        excludeCaptured: true,
                      },
                      agentFilter: {
                        agentsOnly: true,
                        excludeParticipants: true,
                      },
                    })}
                    selectedAgents={participants}
                    onSelectAgent={onUpdateParticipants}
                    headerText="Select agents for this mission"
                  />

                  <Box>
                    <Typography>Selected Agents</Typography>
                    <Stack direction="row" spacing={1} padding={1}>
                      {participants.map((agent) => (
                        <Chip
                          label={gameData.people[agent].name}
                          key={`attackers-${agent}`}
                          className="shadow-md rounded p-2"
                        />
                      ))}
                    </Stack>
                  </Box>
                  <Box>
                    <Typography>
                      There is a possibility agents on this mission will be
                      detected by enemy counterintelligence. If caught, how
                      should they proceed?
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
                  <Box>
                    <p className="text-xs">
                      *Agents attending this mission may suffer loss of life.
                    </p>
                  </Box>
                </>
              )}
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={!nation || !zone || participants.length === 0}
          onClick={(e) => {
            e.preventDefault();
            preparePlot();
            onClose();
          }}
        >
          Done
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </>
  );
};

export default ReconPlot;

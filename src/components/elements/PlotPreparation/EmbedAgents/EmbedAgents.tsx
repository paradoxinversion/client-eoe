import { Box, Button, Typography } from "@mui/material";
import { Person, Zone } from "empire-of-evil/src/types/interfaces/entities";
import { useState } from "react";
import { managers, actions } from "empire-of-evil";
import AgentSelector from "../../Selectors/AgentSelector/AgentSelector";
import ZoneSelector from "../../Selectors/ZoneSelector/ZoneSelector";

type EmbedAgentsProps = {
  onClose?: () => void;
};

const EmbedAgents = ({ onClose }: EmbedAgentsProps) => {
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const preparePlot = () => {
    managers.plots.plotFunctions.embedAgents.generateEmbedAgentsPlot({
      participants: [selectedPerson.id],
      targetZone: selectedZone.id,
    });
    onClose && onClose();
  };
  return (
    <Box padding={"1rem"}>
      <Typography>Embed Agents</Typography>
      <Typography>
        Embed agents in a foreign nation's zone. From there, they will be able
        to launch further operations.
      </Typography>

      {actions.nations
        .getNations({ isEvilEmpire: false })
        .filter(
          (nation) =>
            nation.organizationId !==
            managers.game.GameManager.getInstance().gameData.player
              .organizationId
        )
        .map((nation) => {
          return (
            <ZoneSelector
              zones={actions.zones.getZones({ nationId: nation.id })}
              selectedZone={selectedZone}
              onSelectZone={setSelectedZone}
              headerText={nation.name}
            />
          );
        })}
      {selectedZone && (
        <AgentSelector
          agents={actions.people.getPeople({
            personFilter: {
              organizationId:
                managers.game.GameManager.getInstance().gameData.player
                  .organizationId,
            },
            agentFilter: {
              agentsOnly: true,
              excludeParticipants: true,
            },
          })}
          selectedAgents={selectedPerson}
          onSelectAgent={(agent) => {
            setSelectedPerson(agent);
          }}
          headerText="Select the agent to embed"
        />
      )}
      <Button
        disabled={!selectedZone || !selectedPerson}
        onClick={() => {
          preparePlot();
        }}
      >
        Embed Agent
      </Button>
      <Button
        onClick={() => {
          onClose && onClose();
        }}
      >
        Cancel
      </Button>
    </Box>
  );
};

export default EmbedAgents;

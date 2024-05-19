import { Box, Button, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getNations } from "empire-of-evil/src/nations";
import { getZones } from "empire-of-evil/src/actions/zones";
import { Person, Zone } from "empire-of-evil/src/types/interfaces/entities";
import { useState } from "react";
import { getPeople } from "empire-of-evil/src/actions/people";
import { GameManager } from "empire-of-evil";
import Plot from "empire-of-evil/src/plots/Plot";
import { PlotManager } from "empire-of-evil/src/plots/PlotManager";

const EmbedAgents = ({ cb }) => {
  const dispatch = useAppDispatch();
  const nations = useAppSelector((state) => state.nations);
  const zones = useAppSelector((state) => state.zones);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const preparePlot = () => {
    const plotParams = {
      agents: [selectedPerson.id],
      zoneId: selectedZone.id,
    };
    const plot = new Plot(
      "Embed Agents",
      "embed-agents",
      {
        participants: [selectedPerson.id],
        targetZone: selectedZone.id,
      },
      {}
    );
    PlotManager.getInstance().addPlot(plot);
    cb && cb();
  };
  return (
    <Box>
      <Typography>Embed Agents</Typography>
      <Typography>
        Embed agents in a foreign nation's zone. From there, they will be able
        to launch further operations.
      </Typography>
      {getNations({ isEvilEmpire: false }).map((nation) => {
        return (
          <Box>
            <Typography>{nation.name}</Typography>
            {getZones({ nationId: nation.id }).map((zone) => {
              return (
                <Box>
                  <Typography>{zone.name}</Typography>
                  <Button
                    onClick={() => {
                      setSelectedZone(zone);
                    }}
                  >
                    Select Zone
                  </Button>
                </Box>
              );
            })}
          </Box>
        );
      })}
      {getPeople({
        personFilter: {
          organizationId:
            GameManager.getInstance().gameData.player.organizationId,
        },
        agentFilter: {
          agentsOnly: true,
          excludeParticipants: true,
        },
      }).map((person) => {
        return (
          <Box>
            <Typography>{person.name}</Typography>
            <Button
              onClick={() => {
                setSelectedPerson(person);
              }}
            >
              Select Agent
            </Button>
          </Box>
        );
      })}
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
          cb && cb();
        }}
      >
        Cancel
      </Button>
    </Box>
  );
};

export default EmbedAgents;

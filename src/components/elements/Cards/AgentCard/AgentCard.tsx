import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import { LocationCity as LocationCityIcon } from "@mui/icons-material";
import managers from "empire-of-evil/src/managers";
import { Person } from "empire-of-evil/src/types/interfaces/entities";
import { selectEntity } from "../../../../features/selectionSlice";
import IconContent from "../../IconInt/IconInt";

type AgentCard = {
  agent: Person;
  onSelectAgent: (agent: Person) => void;
};

const AgentCard = ({ agent, onSelectAgent }: AgentCard) => {
  const healthPercentage =
    (agent.derivedAttributes.health.currentHealth /
      agent.derivedAttributes.health.totalHealth) *
    100;
  return (
    <Card>
      <CardHeader
        title={agent.name}
        subheader={agent.agent!.codename || "No Codename"}
      />
      <Divider />
      <CardContent>
        <Typography variant="body2">
          <strong>{agent.agent!.department}</strong>
        </Typography>
        <Typography variant="body2">
          Health:{" "}
          {healthPercentage === 100
            ? "Healthy"
            : healthPercentage > 75
            ? "Injured"
            : healthPercentage > 50
            ? "Seriously Injured"
            : "Critical"}
        </Typography>

        <IconContent
          Icon={LocationCityIcon}
          content={
            managers.game.GameManager.getInstance().gameData.zones[
              agent.agent?.embeddedAt!
            ]
              ? `[${
                  managers.game.GameManager.getInstance().gameData.zones[
                    agent.agent?.embeddedAt!
                  ].name
                }]`
              : managers.game.GameManager.getInstance().gameData.zones[
                  agent.homeZoneId
                ].name
          }
        />
        <Typography variant="body2">
          {managers.game.GameManager.getInstance().gameData.zones[
            agent.agent?.embeddedAt!
          ]
            ? `[${
                managers.game.GameManager.getInstance().gameData.zones[
                  agent.agent?.embeddedAt!
                ].name
              }]`
            : managers.game.GameManager.getInstance().gameData.zones[
                agent.homeZoneId
              ].name}
        </Typography>
        <Typography variant="body2">
          {agent.personnelAt
            ? `${
                managers.game.GameManager.getInstance().gameData.buildings[
                  agent.personnelAt
                ].name
              } (${
                managers.game.GameManager.getInstance().gameData.buildings[
                  agent.personnelAt
                ].type
              })`
            : "No work assignment"}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          onClick={() => {
            onSelectAgent(agent);
          }}
        >
          Select
        </Button>
      </CardActions>
    </Card>
  );
};

export default AgentCard;

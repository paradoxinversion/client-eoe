import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

import { managers, actions } from "empire-of-evil";
import { useAppDispatch } from "../../../../app/hooks";
import { selectEntity } from "../../../../features/selectionSlice";
import { Person } from "empire-of-evil/src/types/interfaces/entities";
import AgentCard from "../../../elements/Cards/AgentCard/AgentCard";
type PersonnelOverview = {
  agents: Person[];
};
const PersonnelOverview = () => {
  const dispatch = useAppDispatch();
  const organizationId =
    managers.game.GameManager.getInstance().gameData.player.organizationId;

  const data = [
    {
      label: "Administrators",
      value: actions.people.getPeople({
        personFilter: {
          organizationId:
            managers.game.GameManager.getInstance().gameData.player
              .organizationId,
        },
        agentFilter: {
          department: "administrator",
          agentsOnly: true,
        },
      }).length,
    },
    {
      label: "Henchmen",
      value: actions.people.getPeople({
        personFilter: {
          organizationId:
            managers.game.GameManager.getInstance().gameData.player
              .organizationId,
        },
        agentFilter: {
          department: "troop",
          agentsOnly: true,
        },
      }).length,
    },
    {
      label: "Doctors",
      value: actions.people.getPeople({
        personFilter: {
          organizationId:
            managers.game.GameManager.getInstance().gameData.player
              .organizationId,
        },
        agentFilter: {
          department: "doctor",
          agentsOnly: true,
        },
      }).length,
    },
    {
      label: "Scientists",
      value: actions.people.getPeople({
        personFilter: {
          organizationId:
            managers.game.GameManager.getInstance().gameData.player
              .organizationId,
        },
        agentFilter: {
          department: "scientist",
          agentsOnly: true,
        },
      }).length,
    },
  ];
  return (
    <>
      <Box padding="1rem">
        <PieChart
          series={[
            {
              paddingAngle: 5,
              innerRadius: 40,
              outerRadius: 60,
              data,
            },
          ]}
          margin={{ right: 5 }}
          width={200}
          height={200}
          slotProps={{
            legend: {
              hidden: true,
              direction: "row",
              position: {
                horizontal: "middle",
                vertical: "bottom",
              },
            },
          }}
        />
        <Grid container columns={6} spacing={"1rem"}>
          {actions.people
            .getPeople({
              personFilter: {
                organizationId,
              },
              agentFilter: { agentsOnly: true },
            })
            .map((agent) => {
              return (
                <Grid item xs={6} md={3} lg={2}>
                  <AgentCard
                    agent={agent}
                    onSelectAgent={() =>
                      dispatch(
                        selectEntity({
                          type: "person",
                          selection: agent,
                        })
                      )
                    }
                  />
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </>
  );
};

export default PersonnelOverview;

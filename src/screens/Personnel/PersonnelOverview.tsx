import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import AgentDataGrid from "../../dataGrids/agentDataGrid";
import { PieArcLabel, PieChart } from "@mui/x-charts/PieChart";

import { organizations, actions, GameManager } from "empire-of-evil";
import { useAppDispatch } from "../../app/hooks";
import { selectEntity } from "../../features/selectionSlice";
import { getPeople } from "empire-of-evil/src/actions/people";

const PersonnelOverview = () => {
  const dispatch = useAppDispatch();
  const organizationId =
    GameManager.getInstance().gameData.player.organizationId;
  const currentAgents = actions.people.getPeople({
    personFilter: {
      organizationId,
    },
    agentFilter: { agentsOnly: true },
  }).length;

  const maxAgents = organizations.getMaxAgents(organizationId);

  const data = [
    {
      label: "Administrators",
      value: getPeople({
        personFilter: {
          organizationId:
            GameManager.getInstance().gameData.player.organizationId,
        },
        agentFilter: {
          department: "administrator",
          agentsOnly: true,
        },
      }).length,
    },
    {
      label: "Henchmen",
      value: getPeople({
        personFilter: {
          organizationId:
            GameManager.getInstance().gameData.player.organizationId,
        },
        agentFilter: {
          department: "troop",
          agentsOnly: true,
        },
      }).length,
    },
    {
      label: "Doctors",
      value: getPeople({
        personFilter: {
          organizationId:
            GameManager.getInstance().gameData.player.organizationId,
        },
        agentFilter: {
          department: "doctor",
          agentsOnly: true,
        },
      }).length,
    },
    {
      label: "Scientists",
      value: getPeople({
        personFilter: {
          organizationId:
            GameManager.getInstance().gameData.player.organizationId,
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
        <Grid container columns={5} spacing={"1rem"}>
          {/* <Grid item xs={10}>
            <AgentDataGrid
              title={`EVIL Employee Roster (${currentAgents}/${maxAgents})`}
              agents={actions.people.getPeople({
                organizationId,
                agentFilter: { agentsOnly: true },
              })}
            />
          </Grid> */}
          {actions.people
            .getPeople({
              personFilter: {
                organizationId,
              },
              agentFilter: { agentsOnly: true },
            })
            .map((agent) => {
              const healthPercentage =
                (agent.derivedAttributes.health.currentHealth /
                  agent.derivedAttributes.health.totalHealth) *
                100;
              return (
                <Grid item xs={1}>
                  <Card>
                    <CardContent>
                      <Typography>
                        {agent.agent.codename
                          ? `${agent.agent.codename}`
                          : "NC"}
                      </Typography>
                      <Typography variant="body2">{agent.name}</Typography>
                      <Typography variant="body2">
                        {agent.agent.department}
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
                      {/* <Typography variant="body2">
                        Salary: ${agent.agent.salary}
                      </Typography> */}
                      <Typography variant="body2">
                        {GameManager.getInstance().gameData.zones[
                          agent.agent.embeddedAt
                        ]
                          ? `[${
                              GameManager.getInstance().gameData.zones[
                                agent.agent.embeddedAt
                              ].name
                            }]`
                          : GameManager.getInstance().gameData.zones[
                              agent.homeZoneId
                            ].name}
                      </Typography>
                      <Typography variant="body2">
                        {agent.personnelAt
                          ? `${
                              GameManager.getInstance().gameData.buildings[
                                agent.personnelAt
                              ].name
                            } (${
                              GameManager.getInstance().gameData.buildings[
                                agent.personnelAt
                              ].type
                            })`
                          : "No work assignment"}
                      </Typography>
                    </CardContent>
                    <Button
                      onClick={() => {
                        dispatch(
                          selectEntity({
                            type: "person",
                            selection: agent,
                          })
                        );
                      }}
                    >
                      Select
                    </Button>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </>
  );
};

export default PersonnelOverview;

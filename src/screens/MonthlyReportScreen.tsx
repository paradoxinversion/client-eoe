import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import { GameManager } from "empire-of-evil";
import { people } from "empire-of-evil/src/actions";
import { getPeople } from "empire-of-evil/src/actions/people";
import { getBuildings, getUpkeep } from "empire-of-evil/src/buildings";
import { getEvilEmpire, getPayroll } from "empire-of-evil/src/organization";
import { useState } from "react";

interface MonthlyReportScreenProps {
  currentGameEvent: any;
  resolveEvent: any;
  gameManager: GameManager;
}
const MonthlyReportScreen = ({
  currentGameEvent,
  resolveEvent,
  gameManager,
}: MonthlyReportScreenProps) => {
  const agents = getPeople(gameManager, {
    organizationId: gameManager.gameData.player.organizationId,
    agentFilter: {
      excludeDepartments: [3],
      agentsOnly: true,
    },
  });
  const [agentPayroll, setAgentPayroll] = useState(
    agents.reduce((acc, agent) => {
      return {
        ...acc,
        [agent.id]: 0,
      };
    }, {})
  );
  const [buildingUpkeep, setBuildingUpkeep] = useState(
    getBuildings(gameManager, {
      organizationId: gameManager.gameData.player.organizationId,
    }).reduce((acc, building) => {
      return {
        ...acc,
        [building.id]: 0,
      };
    }, {})
  );
  const buildings = getBuildings(gameManager, {
    organizationId: gameManager.gameData.player.organizationId,
  });
  const upkeepTotal = getUpkeep(
    gameManager,
    gameManager.gameData.player.organizationId
  );
  const getCommittedPayroll = () => {
    return Object.values(agentPayroll).reduce<number>(
      (total, payrollItem: number) => {
        return total + payrollItem;
      },
      0
    );
  };

  const getCommittedUpkeepTotal = () => {
    return Object.values(buildingUpkeep).reduce<number>(
      (total, upkeepItem: number) => {
        return total + upkeepItem;
      },
      0
    );
  };
  return (
    <Box>
      <Box>
        <List disablePadding={true} dense={true}>
          <ListItem>
            <ListItemText
              primary="New Liquid Income"
              secondary={parseInt(
                currentGameEvent.params.income.buildingWealth
              )}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Total Expenses"
              secondary={
                currentGameEvent.params.expenses.payroll +
                currentGameEvent.params.expenses.upkeep
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Net Income"
              secondary={
                currentGameEvent.params.income.buildingWealth -
                (currentGameEvent.params.expenses.payroll +
                  currentGameEvent.params.expenses.upkeep)
              }
            />
          </ListItem>
        </List>
      </Box>
      <Accordion>
        <AccordionSummary>
          Payroll (Paid: {getCommittedPayroll()})
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
          <Button
            disabled={
              getEvilEmpire(gameManager).wealth <
              getPayroll(
                gameManager,
                gameManager.gameData.player.organizationId
              )
            }
            onClick={() => {
              const payroll = {};
              agents.forEach(({ id, agent: { salary } }) => {
                payroll[id] = salary;
              });
              setAgentPayroll(payroll);
            }}
          >
            Pay All{" "}
            {getPayroll(
              gameManager,
              gameManager.gameData.player.organizationId
            )}
          </Button>
          <Button
            disabled={getCommittedPayroll() === 0}
            onClick={() => {
              const payroll = {};
              agents.forEach(({ id }) => {
                payroll[id] = 0;
              });
              setAgentPayroll(payroll);
            }}
          >
            Pay None{" "}
          </Button>
          <List
            sx={{ overflowY: "scroll", overflowX: "scroll", height: "150px" }}
          >
            {agents.map((person) => {
              return (
                <ListItem key={person.id}>
                  <ListItemText
                    primary={people.getAgentDepartment(person.agent)}
                  />
                  <ListItemText primary={person.name} />
                  <Button
                    color={(agentPayroll[person.id] && "success") || "primary"}
                    disabled={
                      !agentPayroll[person.id] &&
                      getEvilEmpire(gameManager).wealth <
                        getCommittedPayroll() + person.agent.salary
                    }
                    onClick={() => {
                      if (agentPayroll[person.id]) {
                        setAgentPayroll({
                          ...agentPayroll,
                          [person.id]: 0,
                        });
                        return;
                      }
                      setAgentPayroll({
                        ...agentPayroll,
                        [person.id]: person.agent.salary,
                      });
                    }}
                  >
                    {!agentPayroll[person.id]
                      ? `Pay (\$${person.agent.salary})`
                      : `PAID (\$${person.agent.salary})`}
                  </Button>
                </ListItem>
              );
            })}
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>Upkeep</AccordionSummary>
        <Button
          disabled={
            getEvilEmpire(gameManager).wealth <
              getUpkeep(
                gameManager,
                gameManager.gameData.player.organizationId
              ) || getCommittedUpkeepTotal() === upkeepTotal
          }
          onClick={() => {
            const upkeep = {};
            buildings.forEach(({ id, basicAttributes: { upkeepCost } }) => {
              upkeep[id] = upkeepCost;
            });
            setBuildingUpkeep(upkeep);
          }}
        >
          Pay All{" "}
          {getUpkeep(gameManager, gameManager.gameData.player.organizationId)}
        </Button>
        <Button
          disabled={getCommittedUpkeepTotal() === 0}
          onClick={() => {
            const upkeep = {};
            buildings.forEach(({ id }) => {
              upkeep[id] = 0;
            });
            setBuildingUpkeep(upkeep);
          }}
        >
          Pay None{" "}
        </Button>
        <AccordionDetails sx={{ height: "100px", overflow: "scroll" }}>
          {getBuildings(gameManager, {
            organizationId: gameManager.gameData.player.organizationId,
          }).map((building) => {
            return (
              <ListItem key={building.id}>
                <ListItemText primary={building.name} />
                <Button
                  color={buildingUpkeep[building.id] ? "success" : "primary"}
                  onClick={() => {
                    if (buildingUpkeep[building.id]) {
                      setBuildingUpkeep({
                        ...buildingUpkeep,
                        [building.id]: 0,
                      });
                      return;
                    }
                    setBuildingUpkeep({
                      ...buildingUpkeep,
                      [building.id]: building.basicAttributes.upkeepCost,
                    });
                  }}
                >
                  {!buildingUpkeep[building.id]
                    ? `Pay (\$${building.basicAttributes.upkeepCost})`
                    : `PAID (\$${building.basicAttributes.upkeepCost})`}
                </Button>
              </ListItem>
            );
          })}
        </AccordionDetails>
      </Accordion>
      <Button
        onClick={() => {
          resolveEvent({
            buildingUpkeep,
            agentPayroll,
          });
        }}
      >
        {" "}
        Pay Comitted Expenses (
        {getCommittedPayroll() + getCommittedUpkeepTotal()})
      </Button>
    </Box>
  );
};

export default MonthlyReportScreen;

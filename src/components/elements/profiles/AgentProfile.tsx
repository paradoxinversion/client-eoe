import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {
  Shield as ShieldIcon,
  ShieldOutlined as ShieldOutlinedIcon,
  HomeWork as HomeWorkIcon,
  HomeWorkOutlined as HomeWorkOutlinedIcon,
  Science as ScienceIcon,
  ScienceOutlined as ScienceOutlinedIcon,
  LocalHospital as LocalHospitalIcon,
  LocalHospitalOutlined as LocalHospitalOutlinedIcon,
  Star as StarIcon,
} from "@mui/icons-material";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { GameManager, actions } from "empire-of-evil";
import { selectEntity } from "../../../features/selectionSlice";
import PersonDataGrid from "../../dataGrids/personDataGrid";
import { useEffect, useState } from "react";
import { setCodename } from "empire-of-evil/src/actions/people";
import { setPeople } from "../../../features/personSlice";
import { getCodeName } from "empire-of-evil/src/generators/names";
import HeaderGridItem from "../HeaderGridItem/HeaderGridItem";
import { updateGameData } from "../../../actions/dataManagement";
import {
  AgentDepartment,
  Person,
} from "empire-of-evil/src/types/interfaces/entities";
import { attributeLevelStr, skillLevelStr } from "empire-of-evil/src/utilities";

const AgentProfile = () => {
  const selectedAgent = useAppSelector((state) => state.selections.person);
  const people = useAppSelector((state) => state.people);
  const dispatch = useAppDispatch();
  const [editCodename, setEditCodename] = useState(false);
  const [codenameValue, setCodenameValue] = useState(
    selectedAgent.agent.codename || ""
  );

  const setDepartment = (department: AgentDepartment) => {
    actions.people.changeAgentDepartment(selectedAgent, department);
    // updateGameData(GameManager.getInstance().gameData);
    dispatch(setPeople(GameManager.getInstance().gameData.people));
    dispatch(
      selectEntity({
        type: "person",
        selection: GameManager.getInstance().gameData.people[selectedAgent.id],
      })
    );
  };

  useEffect(() => {}, [selectedAgent, people]);
  return (
    <Box padding="1rem">
      <Box>
        {/* <Typography variant="h4">Agent Profile</Typography> */}
        <Typography variant="h5">{selectedAgent.name}</Typography>
        {editCodename ? (
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              const update = setCodename(
                selectedAgent.id,
                codenameValue
              ).people;
              dispatch(setPeople(update));
              dispatch(
                selectEntity({
                  type: "person",
                  selection: update[selectedAgent.id],
                })
              );
              setEditCodename(false);
            }}
          >
            <TextField
              name="codename"
              size="small"
              value={codenameValue}
              onChange={(e) => {
                setCodenameValue(e.target.value);
              }}
            />
            <Button
              onClick={() => {
                setCodenameValue(getCodeName());
              }}
            >
              Random
            </Button>
            <Button type="submit">Save</Button>
            <Button
              onClick={() => {
                setEditCodename(false);
              }}
            >
              Cancel
            </Button>
          </Box>
        ) : (
          <Typography
            variant="h5"
            color={"GrayText"}
            onClick={() => {
              setEditCodename(true);
            }}
          >
            {selectedAgent.agent.codename || "Set Codename"}
          </Typography>
        )}

        {selectedAgent.agent.department !== "overlord" && (
          <Box>
            <IconButton
              onClick={() => {
                setDepartment("troop");
              }}
            >
              {selectedAgent.agent.department === "troop" ? (
                <ShieldIcon />
              ) : (
                <ShieldOutlinedIcon />
              )}
            </IconButton>
            <IconButton
              onClick={() => {
                setDepartment("administrator");
              }}
            >
              {selectedAgent.agent.department === "administrator" ? (
                <HomeWorkIcon />
              ) : (
                <HomeWorkOutlinedIcon />
              )}
            </IconButton>
            <IconButton
              onClick={() => {
                setDepartment("scientist");
              }}
            >
              {selectedAgent.agent.department === "scientist" ? (
                <ScienceIcon />
              ) : (
                <ScienceOutlinedIcon />
              )}
            </IconButton>
            <IconButton
              onClick={() => {
                setDepartment("doctor");
              }}
            >
              {selectedAgent.agent.department === "doctor" ? (
                <LocalHospitalIcon />
              ) : (
                <LocalHospitalOutlinedIcon />
              )}
            </IconButton>
          </Box>
        )}
      </Box>
      <Grid container spacing="1rem">
        {selectedAgent.agent &&
          selectedAgent.agent.department !== "overlord" && (
            <Grid item>
              <Card sx={{ padding: 1 }}>
                <CardHeader
                  title="Commander"
                  titleTypographyProps={{ variant: "body1" }}
                  subheader={people[selectedAgent.agent.commanderId].name}
                  subheaderTypographyProps={{ variant: "body2" }}
                />
                {/* <Typography>
                  Commander: {people[selectedAgent.agent.commanderId].name}
                </Typography> */}
                <Divider />
                <CardActions>
                  <Button
                    onClick={() => {
                      dispatch(
                        selectEntity({
                          type: "person",
                          selection: people[selectedAgent.agent.commanderId],
                        })
                      );
                    }}
                  >
                    Select Commander
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )}
        <Grid item>
          <Card sx={{ padding: 1, height: "100%" }}>
            <CardHeader
              title="Location"
              titleTypographyProps={{ variant: "body1" }}
              subheader={
                GameManager.getInstance().gameData.zones[
                  selectedAgent.homeZoneId
                ].name
              }
              subheaderTypographyProps={{ variant: "body2" }}
            />
            {selectedAgent.agent.embeddedAt && (
              <Typography>
                Embedded at{" "}
                {
                  GameManager.getInstance().gameData.zones[
                    selectedAgent.agent.embeddedAt
                  ].name
                }
              </Typography>
            )}
          </Card>
        </Grid>
      </Grid>

      <Typography variant="overline">Compensation</Typography>
      <Grid container spacing="1rem">
        <HeaderGridItem title="Salary" content={selectedAgent.agent.salary} />
      </Grid>
      <Typography variant="overline">Aptitude</Typography>
      <Grid container spacing="1rem">
        <HeaderGridItem
          title="Agility"
          content={attributeLevelStr(selectedAgent.standardAttributes.agility)}
        />
        <HeaderGridItem
          title="Constitution"
          content={attributeLevelStr(
            selectedAgent.standardAttributes.constitution
          )}
        />
        <HeaderGridItem
          title="Intelligence"
          content={attributeLevelStr(
            selectedAgent.standardAttributes.intelligence
          )}
        />
        <HeaderGridItem
          title="Strength"
          content={attributeLevelStr(selectedAgent.standardAttributes.strength)}
        />
      </Grid>
      <Typography variant="overline">Skills</Typography>
      <Grid container spacing="1rem" marginBottom={1}>
        <HeaderGridItem
          title="Administration"
          content={skillLevelStr(selectedAgent.skills.administration)}
        />
        <HeaderGridItem
          title="Combat"
          content={skillLevelStr(selectedAgent.skills.combat)}
        />
        <HeaderGridItem
          title="Disguise"
          content={skillLevelStr(selectedAgent.skills.disguise)}
        />
        <HeaderGridItem
          title="Espionage"
          content={skillLevelStr(selectedAgent.skills.espionage)}
        />
        <HeaderGridItem
          title="Leadership"
          content={skillLevelStr(selectedAgent.skills.leadership)}
        />
        <HeaderGridItem
          title="Science"
          content={skillLevelStr(selectedAgent.skills.science)}
        />
        <HeaderGridItem
          title="Security"
          content={skillLevelStr(selectedAgent.skills.security)}
        />
      </Grid>
      <Divider />
      <Box>
        <Typography variant="h5">Subordinate Agents</Typography>
        <Grid container spacing="1rem" columns={6}>
          {actions.people
            .getPeople({
              agentFilter: {
                commander: selectedAgent.id,
              },
            })
            .map((person: Person) => {
              return (
                <Grid item xs={6} sm={2} lg={1}>
                  <Card>
                    <CardHeader
                      title={person.name}
                      titleTypographyProps={{ variant: "body1" }}
                      subheader={person.agent.codename || "No Codename"}
                      subheaderTypographyProps={{ variant: "body2" }}
                    />
                    <Divider />
                    <CardActions>
                      <Button
                        onClick={() => {
                          dispatch(
                            selectEntity({
                              type: "person",
                              selection: person,
                            })
                          );
                        }}
                      >
                        Select
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
        {/* <PersonDataGrid
          people={actions.people.getPeople({
            agentFilter: {
              commander: selectedAgent.id,
            },
          })}
          title="Subordinate Agents"
        /> */}
      </Box>
    </Box>
  );
};

export default AgentProfile;

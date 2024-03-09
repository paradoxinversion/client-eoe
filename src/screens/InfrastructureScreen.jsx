import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import BuildingDataGrid from "../dataGrids/buildingDataGrid";
import { buildings, zones } from "empire-of-evil";
import MetricNumber from "../elements/MetricNumber/MetricNumber";
import ZonePanel from "../elements/ZonePanel";
import { useDispatch, useSelector } from "react-redux";
import { clearSelections, selectEntity } from "../features/selectionSlice";
import PersonDataGrid from "../dataGrids/personDataGrid";
import { useState } from "react";
import { getPeople } from "empire-of-evil/src/actions/people";
import { addPersonnel, removePersonnel } from "empire-of-evil/src/buildings";

const InfrastructureScreen = ({ gameManager }) => {
  const dispatch = useDispatch();
  const [assignStaffOpen, setAssignStaffOpen] = useState(false);
  const buildingsData = useSelector((state) => state.buildings);
  const peopleData = useSelector((state) => state.people);
  const selectedBuilding = useSelector((state) => state.selections.building);
  return (
    <Box>
      <Toolbar />
      <Dialog open={assignStaffOpen}>
        <DialogTitle>Assign Staff</DialogTitle>
        <DialogContent>
          <DialogContentText>Foobar</DialogContentText>
          <Typography>Assign Staff members to this building</Typography>
          <Grid container spacing={1} columns={3}>
            {selectedBuilding &&
              getPeople(gameManager, {
                zoneId: selectedBuilding?.zoneId,
                agentFilter: { agentsOnly: true, department: -1},
              }).map((person) => {
                let relatedAttributeStat;
                let relatedAttributeName = "";
                switch (selectedBuilding.type) {
                  case "bank":
                    relatedAttributeStat = person.administration;
                    relatedAttributeName = "Administration";
                    break;
                  case "laboratory":
                    relatedAttributeStat = person.intelligence;
                    relatedAttributeName = "Intelligence";
                    break;
                  case "office":
                    relatedAttributeStat = person.administration;
                    relatedAttributeName = "Administration";
                    break;
                  default:
                    relatedAttributeStat = 0;
                    break;
                }
                return (
                  <Grid item>
                    <Chip
                      variant={
                        selectedBuilding.personnel.includes(person.id)
                          ? "outlined"
                          : "filled"
                      }
                      onClick={() => {
                        if (selectedBuilding.personnel.includes(person.id)) {
                          const update = removePersonnel(
                            person,
                            selectedBuilding
                          );
                          gameManager.updateGameData(update);
                          
                        } else {
                          const update = addPersonnel(person, selectedBuilding);
                          gameManager.updateGameData(update);
                        }
                      }}
                      label={`${person.name} (${relatedAttributeName}: ${relatedAttributeStat})`}
                    />
                  </Grid>
                );
              })}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setAssignStaffOpen(false);
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Box>
        <Box id="home-greeting" component="header" padding="1rem">
          <Typography variant="h3">Infrastructure</Typography>
        </Box>
        <Divider />
        <Box>
          <Button color="inherit" onClick={() => {}}>
            Button
          </Button>
        </Box>
        <Divider />
        <Stack
          id
          padding="1rem"
          direction={"row"}
          spacing={"1rem"}
          justifyContent={"center"}
        >
          <MetricNumber
            title="Buildings"
            number={
              buildings.getBuildings(gameManager, {
                organizationId: gameManager.gameData.player.organizationId,
              }).length
            }
          />
        </Stack>
        <Divider />
        {selectedBuilding ? (
          <>
            <Button
              onClick={() => {
                dispatch(clearSelections());
              }}
            >
              back
            </Button>
            <Button
              onClick={() => {
                setAssignStaffOpen(true);
              }}
            >
              Assign Staff
            </Button>
            <Divider />
            <Box>
              <Typography>{selectedBuilding.name}</Typography>
              <Stack>
                <Typography>{selectedBuilding.type}</Typography>
                <Typography>
                  Upkeep Cost: ${selectedBuilding.upkeepCost}
                </Typography>
              </Stack>
              <PersonDataGrid
                people={selectedBuilding.personnel.map((id) => peopleData[id])}
                gameManager={gameManager}
              />
            </Box>
          </>
        ) : (
          <>
            <Box id="zones" padding="1rem">
              <Box>
                <Typography>Zones</Typography>
              </Box>
              <ZonePanel
                gridHeight={"200px"}
                gameManager={gameManager}
                zones={zones.getZones(
                  gameManager,
                  gameManager.gameData.player.empireId
                )}
                title={"Zones"}
                // withErrorMargin={false}
              />
            </Box>
            <Box id="buildings" padding="1rem">
              <Box>
                <Typography>Buildings</Typography>
              </Box>
              <BuildingDataGrid
                gridHeight={"200px"}
                gameManager={gameManager}
                buildings={buildings.getBuildings(gameManager, {
                  type: "laboratory",
                  organizationId: gameManager.gameData.player.organizationId,
                })}
                title={"Laboraties"}
                cb={(entity) => {
                  console.log("Select", entity);
                  dispatch(
                    selectEntity({
                      type: "building",
                      selection: buildingsData[entity.id],
                    })
                  );
                }}
              />
              <BuildingDataGrid
                gridHeight={"200px"}
                gameManager={gameManager}
                buildings={buildings.getBuildings(gameManager, {
                  type: "bank",
                  organizationId: gameManager.gameData.player.organizationId,
                })}
                title={"Bank"}
                cb={(entity) => {
                  dispatch(
                    selectEntity({
                      type: "building",
                      selection: buildingsData[entity.id],
                    })
                  );
                }}
              />
              <BuildingDataGrid
                gridHeight={"200px"}
                gameManager={gameManager}
                buildings={buildings.getBuildings(gameManager, {
                  type: "apartment",
                  organizationId: gameManager.gameData.player.organizationId,
                })}
                title={"Apartments"}
                cb={(entity) => {
                  console.log("Select", entity);
                  dispatch(
                    selectEntity({
                      type: "building",
                      selection: buildingsData[entity.id],
                    })
                  );
                }}
              />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default InfrastructureScreen;

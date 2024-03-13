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
import { GameManager, buildings, zones } from "empire-of-evil";
import MetricNumber from "../elements/MetricNumber/MetricNumber";
import ZonePanel from "../elements/ZonePanel";
import { clearSelections, selectEntity } from "../features/selectionSlice";
import PersonDataGrid from "../dataGrids/personDataGrid";
import { useState } from "react";
import { getPeople } from "empire-of-evil/src/actions/people";
import {
  addPersonnel,
  getResourceOutput,
  removePersonnel,
} from "empire-of-evil/src/buildings";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { GameData } from "empire-of-evil/src/GameManager";
import { setPeople } from "../features/personSlice";
import { setBuildings } from "../features/buildingSlice";
import PersonnelDataGrid from "../dataGrids/personnelDataGrid";

interface InfrastructureScreenProps {
  gameManager: GameManager;
}

const InfrastructureScreen = ({ gameManager }: InfrastructureScreenProps) => {
  const dispatch = useAppDispatch();
  const [assignStaffOpen, setAssignStaffOpen] = useState(false);
  const buildingsData = useAppSelector((state) => state.buildings);
  const peopleData = useAppSelector((state) => state.people);
  const selectedBuilding = useAppSelector((state) => state.selections.building);
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
                excludePersonnel: true,
                agentFilter: {
                  agentsOnly: true,
                  department:
                    selectedBuilding.type === "bank"
                      ? 1
                      : selectedBuilding.type === "laboratory"
                      ? 2
                      : -1,
                },
              }).map((person) => {
                let relatedAttributeStat;
                let relatedAttributeName = "";
                switch (selectedBuilding.type) {
                  case "bank":
                    relatedAttributeStat =
                      person.basicAttributes.administration;
                    relatedAttributeName = "Administration";
                    break;
                  case "laboratory":
                    relatedAttributeStat = person.basicAttributes.intelligence;
                    relatedAttributeName = "Intelligence";
                    break;
                  case "office":
                    relatedAttributeStat =
                      person.basicAttributes.administration;
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
                          dispatch(setPeople(update.people));
                          dispatch(setBuildings(update.buildings));
                          dispatch(
                            selectEntity({
                              type: "building",
                              selection: update.buildings[selectedBuilding.id],
                            })
                          );

                          setAssignStaffOpen(false);
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
              disabled={
                selectedBuilding?.personnel.length ===
                selectedBuilding?.basicAttributes.maxPersonnel
              }
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
                  Upkeep Cost: ${selectedBuilding.basicAttributes.upkeepCost}
                </Typography>
              </Stack>
              <Typography>
                Science Output:{" "}
                {getResourceOutput(gameManager, selectedBuilding).science}
              </Typography>
              <Typography>
                Wealth Output:{" "}
                {getResourceOutput(gameManager, selectedBuilding).wealth}
              </Typography>
              <Typography>
                Housing Output:{" "}
                {getResourceOutput(gameManager, selectedBuilding).housing}
              </Typography>
              <PersonnelDataGrid
                fireFn={(person) => {
                  const update = removePersonnel(person, selectedBuilding);

                  gameManager.updateGameData(update);
                  dispatch(setBuildings(update.buildings));
                  dispatch(setPeople(update.people));
                  dispatch(
                    selectEntity({
                      type: "building",
                      selection: update.buildings[selectedBuilding.id],
                    })
                  );
                }}
                title="Personnel"
                personnel={selectedBuilding.personnel.map(
                  (id) => peopleData[id]
                )}
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

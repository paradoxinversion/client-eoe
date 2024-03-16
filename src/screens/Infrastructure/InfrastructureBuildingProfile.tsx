import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import BuildingProfile from "../../elements/profiles/BuildingProfile";
import { clearSelections, selectEntity } from "../../features/selectionSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useState } from "react";
import { IntegratedManagerProps } from "../..";
import { actions, buildings } from "empire-of-evil";
import { updateGameData } from "../../actions/dataManagement";

const InfrastructureBuildingProfile = ({
  gameManager,
}: IntegratedManagerProps) => {
  const dispatch = useAppDispatch();
  const selectedBuilding = useAppSelector((state) => state.selections.building);
  const [assignStaffOpen, setAssignStaffOpen] = useState(false);
  return (
    <>
      <Dialog open={assignStaffOpen}>
        <DialogTitle>Assign Staff</DialogTitle>
        <DialogContent>
          <DialogContentText>Foobar</DialogContentText>
          <Typography>Assign Staff members to this building</Typography>
          <Grid container spacing={1} columns={3}>
            {selectedBuilding &&
              actions.people
                .getPeople(gameManager, {
                  zoneId: selectedBuilding?.zoneId,
                  excludePersonnel: true,
                  agentFilter: {
                    excludeParticipants: true,
                    agentsOnly: true,
                    department:
                      selectedBuilding.type === "bank"
                        ? 1
                        : selectedBuilding.type === "laboratory"
                        ? 2
                        : -1,
                  },
                })
                .map((person) => {
                  let relatedAttributeStat;
                  let relatedAttributeName = "";
                  switch (selectedBuilding.type) {
                    case "bank":
                      relatedAttributeStat =
                        person.basicAttributes.administration;
                      relatedAttributeName = "Administration";
                      break;
                    case "laboratory":
                      relatedAttributeStat =
                        person.basicAttributes.intelligence;
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
                            const update = buildings.removePersonnel(
                              person,
                              selectedBuilding
                            );

                            updateGameData(gameManager, update);
                          } else {
                            const update = buildings.addPersonnel(
                              person,
                              selectedBuilding
                            );

                            updateGameData(gameManager, update);
                            dispatch(
                              selectEntity({
                                type: "building",
                                selection:
                                  update.buildings[selectedBuilding.id],
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
      <BuildingProfile gameManager={gameManager} />
    </>
  );
};

export default InfrastructureBuildingProfile;

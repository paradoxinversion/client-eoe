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

import { GameManager, actions, buildings } from "empire-of-evil";
import { updateGameData } from "../../actions/dataManagement";

const InfrastructureBuildingProfile = () => {
  const dispatch = useAppDispatch();
  const selectedBuilding = useAppSelector((state) => state.selections.building);
  const [assignStaffOpen, setAssignStaffOpen] = useState(false);
  return (
    <>
      <Dialog open={assignStaffOpen}>
        <DialogTitle>Assign Staff</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Assign Staff members to this building
          </DialogContentText>

          {selectedBuilding.type === "laboratory" && (
            <Typography variant="caption">
              This facility must be staffed by scientists residing in the zone.
            </Typography>
          )}
          {selectedBuilding.type === "bank" && (
            <Typography variant="caption">
              This facility must be staffed by administrators residing in the
              zone.
            </Typography>
          )}
          {selectedBuilding.type === "hospital" && (
            <Typography variant="caption">
              This facility must be staffed by doctors residing in the zone.
            </Typography>
          )}
          <Grid container spacing={1} columns={3}>
            {selectedBuilding &&
              actions.people
                .getPeople({
                  zone: {
                    zoneId: selectedBuilding?.zoneId,
                  },
                  personFilter: {
                    excludePersonnel: true,
                  },
                  agentFilter: {
                    excludeParticipants: true,
                    agentsOnly: true,
                    department:
                      selectedBuilding.type === "bank"
                        ? "administrator"
                        : selectedBuilding.type === "office"
                        ? "administrator"
                        : selectedBuilding.type === "laboratory"
                        ? "scientist"
                        : selectedBuilding.type === "hospital"
                        ? "doctor"
                        : "any",
                    excludeEmbedded: true,
                  },
                })
                .map((person) => {
                  let relatedAttributeStat;
                  let relatedAttributeName = "";
                  switch (selectedBuilding.type) {
                    case "bank":
                      relatedAttributeStat = person.skills.administration;
                      relatedAttributeName = "Administration";
                      break;
                    case "laboratory":
                      relatedAttributeStat =
                        person.standardAttributes.intelligence;
                      relatedAttributeName = "Intelligence";
                      break;
                    case "office":
                      relatedAttributeStat = person.skills.administration;
                      relatedAttributeName = "Administration";
                      break;
                    case "hospital":
                      relatedAttributeStat = person.skills.medicine;
                      relatedAttributeName = "Medicine";
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

                            updateGameData(update);
                          } else {
                            const update = buildings.addPersonnel(
                              person,
                              selectedBuilding
                            );

                            updateGameData(
                              GameManager.getInstance().updateGameData(update)
                            );
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
      <BuildingProfile />
    </>
  );
};

export default InfrastructureBuildingProfile;

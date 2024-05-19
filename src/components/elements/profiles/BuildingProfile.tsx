import {
  Box,
  Typography,
  Stack,
  Grid,
  Button,
  Card,
  CardContent,
  CardActionArea,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { GameManager, buildings } from "empire-of-evil";

import PersonnelDataGrid from "../../dataGrids/personnelDataGrid";
import { selectEntity } from "../../../features/selectionSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { updateGameData } from "../../../actions/dataManagement";
import PersonDataGrid from "../../dataGrids/personDataGrid";
import { useState } from "react";
import { addResident, removeResident } from "empire-of-evil/src/buildings";
import { getPeople } from "empire-of-evil/src/actions/people";

const BuildingProfile = () => {
  const dispatch = useAppDispatch();
  const selectedBuilding = useAppSelector((state) => state.selections.building);
  const peopleState = useAppSelector((state) => state.people);
  const [addInhabitantOpen, setAddInhabitantOpen] = useState(false);
  return (
    <Box>
      <Dialog open={addInhabitantOpen}>
        <DialogContent>
          <DialogContentText>
            Assign Residents to this building
          </DialogContentText>
          {getPeople({
            personFilter: {
              excludeResidents: true,
            },
            zone: {
              zoneId: selectedBuilding.zoneId,
            },
          }).map((person) => (
            <Button
              onClick={() => {
                addResident(selectedBuilding.id, person.id);
                setAddInhabitantOpen(false);
              }}
            >
              {person.name}
            </Button>
          ))}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setAddInhabitantOpen(false);
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Typography variant="h4">{selectedBuilding.name}</Typography>
      <Typography variant="h5" color="GrayText">
        {selectedBuilding.type}
      </Typography>

      <Grid container spacing={"1rem"}>
        <Grid item>
          <Typography variant="body2" color="GrayText">
            Upkeep Cost
          </Typography>
          <Typography variant="body2">
            ${selectedBuilding.basicAttributes.upkeepCost}
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="body2" color="GrayText">
            Science Output
          </Typography>
          <Typography variant="body2">
            {buildings.getResourceOutput(selectedBuilding).science}
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="body2" color="GrayText">
            Wealth Output
          </Typography>
          <Typography variant="body2">
            {buildings.getResourceOutput(selectedBuilding).wealth}
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="body2" color="GrayText">
            Housing
          </Typography>
          <Typography variant="body2">
            {buildings.getResourceOutput(selectedBuilding).housing}
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="body2" color="GrayText">
            Infrastructure Output
          </Typography>
          <Typography variant="body2">
            {buildings.getResourceOutput(selectedBuilding).infrastructure}
          </Typography>
        </Grid>
      </Grid>

      <PersonnelDataGrid
        fireFn={(person) => {
          const update = buildings.removePersonnel(person, selectedBuilding);
          updateGameData(update);
          dispatch(
            selectEntity({
              type: "building",
              selection: update.buildings[selectedBuilding.id],
            })
          );
        }}
        title="Personnel"
        personnel={selectedBuilding.personnel.map((id) => peopleState[id])}
      />

      {selectedBuilding.type === "apartment" && (
        <Box>
          <Stack direction="row" spacing={2}>
            <Button
              onClick={() => {
                setAddInhabitantOpen(true);
              }}
              disabled={
                selectedBuilding.inhabitants.length >=
                selectedBuilding.resourceAttributes.housingCapacity
              }
            >
              {" "}
              Add Resident{" "}
            </Button>
            <Button disabled={selectedBuilding.inhabitants.length === 0}>
              {" "}
              Remove Resident{" "}
            </Button>
          </Stack>
          <Grid container spacing={1} sx={{ padding: "1rem" }} columns={5}>
            {selectedBuilding.inhabitants.map((p) => {
              const per = GameManager.getInstance().gameData.people[p];
              return (
                <Grid item xs={1}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">
                        {per.name.split(" ")[0]}
                      </Typography>
                      <Typography variant="h6">
                        {per.name.split(" ")[1]}
                      </Typography>
                    </CardContent>
                    <CardActionArea>
                      <Button
                        onClick={() => {
                          removeResident(selectedBuilding.id, per.id);
                          updateGameData(GameManager.getInstance().gameData);
                          dispatch(
                            selectEntity({
                              type: "building",
                              selection: selectedBuilding,
                            })
                          );
                        }}
                      >
                        Remove Resident
                      </Button>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
          {/* <PersonDataGrid
            title={`Residents (${selectedBuilding.inhabitants.length})`}
            people={selectedBuilding.inhabitants.map(
              (p) => GameManager.getInstance().gameData.people[p]
            )}
          /> */}
        </Box>
      )}
    </Box>
  );
};

export default BuildingProfile;

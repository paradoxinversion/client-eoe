import { Box, Typography, Stack, Grid } from "@mui/material";
import { GameManager, buildings } from "empire-of-evil";

import PersonnelDataGrid from "../../dataGrids/personnelDataGrid";
import { selectEntity } from "../../features/selectionSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateGameData } from "../../actions/dataManagement";
import PersonDataGrid from "../../dataGrids/personDataGrid";

const BuildingProfile = () => {
  const dispatch = useAppDispatch();
  const selectedBuilding = useAppSelector((state) => state.selections.building);
  const peopleState = useAppSelector((state) => state.people);
  return (
    <Box>
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
        <PersonDataGrid
          title="Residents"
          people={selectedBuilding.inhabitants.map(
            (p) => GameManager.getInstance().gameData.people[p]
          )}
        />
      )}
    </Box>
  );
};

export default BuildingProfile;

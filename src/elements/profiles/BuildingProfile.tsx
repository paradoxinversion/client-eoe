import { Box, Typography, Stack } from "@mui/material";
import { buildings } from "empire-of-evil";
import { IntegratedManagerProps } from "../..";
import PersonnelDataGrid from "../../dataGrids/personnelDataGrid";
import { selectEntity } from "../../features/selectionSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateGameData } from "../../actions/dataManagement";

const BuildingProfile = ({ gameManager }: IntegratedManagerProps) => {
  const dispatch = useAppDispatch();
  const selectedBuilding = useAppSelector((state) => state.selections.building);
  const peopleState = useAppSelector((state) => state.people);
  return (
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
        {buildings.getResourceOutput(gameManager, selectedBuilding).science}
      </Typography>
      <Typography>
        Wealth Output:{" "}
        {buildings.getResourceOutput(gameManager, selectedBuilding).wealth}
      </Typography>
      <Typography>
        Housing Output:{" "}
        {buildings.getResourceOutput(gameManager, selectedBuilding).housing}
      </Typography>
      <Typography>
        Infrastructure Output:{" "}
        {
          buildings.getResourceOutput(gameManager, selectedBuilding)
            .infrastructure
        }
      </Typography>
      <PersonnelDataGrid
        fireFn={(person) => {
          const update = buildings.removePersonnel(person, selectedBuilding);
          updateGameData(gameManager, update);
          dispatch(
            selectEntity({
              type: "building",
              selection: update.buildings[selectedBuilding.id],
            })
          );
        }}
        title="Personnel"
        personnel={selectedBuilding.personnel.map((id) => peopleState[id])}
        gameManager={gameManager}
      />
    </Box>
  );
};

export default BuildingProfile;

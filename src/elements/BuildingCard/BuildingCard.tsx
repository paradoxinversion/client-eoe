import {
  Card,
  CardContent,
  Typography,
  Stack,
  CardActions,
  Button,
} from "@mui/material";
import { Building } from "empire-of-evil/src/types/interfaces/entities";
import { Groups as GroupsIcon } from "@mui/icons-material";
import { useAppDispatch } from "../../app/hooks";
import { selectEntity } from "../../features/selectionSlice";

interface BuildingCardProps {
  building: Building;
}
const BuildingCard = ({ building }: BuildingCardProps) => {
  const dispatch = useAppDispatch();
  return (
    <Card sx={{ padding: 1 }}>
      <CardContent>
        <Typography>{building.name}</Typography>
        <Stack direction="row" spacing={1}>
          <GroupsIcon />
          <Typography>
            {building.personnel.length}/{building.basicAttributes.maxPersonnel}
          </Typography>
        </Stack>
        <Typography>Upkeep: ${building.basicAttributes.upkeepCost}</Typography>
        <Typography>
          Infrastructure Cost: ${building.basicAttributes.infrastructureCost}
        </Typography>
        <Typography>Condition: Okay</Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => {
            dispatch(selectEntity({ selection: building, type: "building" }));
          }}
        >
          Select
        </Button>
      </CardActions>
    </Card>
  );
};

export default BuildingCard;

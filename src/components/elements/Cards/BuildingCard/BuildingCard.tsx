import {
  Card,
  CardContent,
  Typography,
  Stack,
  CardActions,
  Button,
  CardHeader,
  Divider,
  Box,
} from "@mui/material";
import { Building } from "empire-of-evil/src/types/interfaces/entities";
import {
  Groups as GroupsIcon,
  Receipt as ReceiptIcon,
  AccountBalance as AccountBalanceIcon,
} from "@mui/icons-material";
import { useAppDispatch } from "../../../../app/hooks";
import { selectEntity } from "../../../../features/selectionSlice";
import IconContent from "../../IconInt/IconInt";
import icons from "../../Icons/Icons";
import { BuildingType } from "empire-of-evil/src/buildings";

interface BuildingCardProps {
  building: Building;
}

const BuildingCard = ({ building }: BuildingCardProps) => {
  const dispatch = useAppDispatch();
  const Icon = icons.buildings[building.type as BuildingType];
  return (
    <Card>
      <CardHeader
        title={building.name}
        titleTypographyProps={{ variant: "body1" }}
      />
      <Divider />
      <Stack direction="row" spacing={1} padding="1rem">
        <IconContent
          Icon={GroupsIcon}
          content={`${building.personnel.length}/${building.basicAttributes.maxPersonnel}`}
        />
        <IconContent
          Icon={ReceiptIcon}
          content={`\$${building.basicAttributes.upkeepCost}`}
        />
        <IconContent
          Icon={AccountBalanceIcon}
          content={building.basicAttributes.infrastructureCost}
        />
      </Stack>
      <Box sx={{ paddingX: "1rem" }}>
        <IconContent Icon={Icon} content={building.type.toLocaleUpperCase()} />
      </Box>
      <CardContent>
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

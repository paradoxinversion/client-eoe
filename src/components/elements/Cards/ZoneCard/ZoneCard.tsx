import {
  Card,
  Stack,
  CardActions,
  Button,
  CardHeader,
  Divider,
  Tooltip,
} from "@mui/material";
import { Nation, Zone } from "empire-of-evil/src/types/interfaces/entities";
import {
  People as PeopleIcon,
  Newspaper as NewspaperIcon,
  LocationCity as LocationCityIcon,
  Terrain as TerrainIcon,
} from "@mui/icons-material";
import { useAppDispatch } from "../../../../app/hooks";
import IconContent from "../../IconInt/IconInt";

interface ZoneCardProps {
  zone: Zone;
  selectCallback?: (zone: Zone) => void;
}

const ZoneCard = (props: ZoneCardProps) => {
  const { zone, selectCallback } = props;
  return (
    <Card>
      <CardHeader title={zone.name} />
      <Divider />
      <Stack direction="row" spacing={1} padding="1rem" paddingBottom={0}>
        <Tooltip title="Population">
          <IconContent
            Icon={PeopleIcon}
            content={100}
            label="Zone Population"
          />
        </Tooltip>
      </Stack>
      <Stack direction="row" spacing={1} paddingX="1rem">
        <Tooltip title="Zone Size">
          <IconContent
            Icon={TerrainIcon}
            content={zone.size}
            label="Zone Size"
          />
        </Tooltip>
      </Stack>
      <Stack direction="row" spacing={1} padding="1rem" paddingTop={0}>
        <Tooltip title="Intelligence Level">
          <IconContent
            Icon={NewspaperIcon}
            content={50}
            label="Intelligence Level"
          />
        </Tooltip>
      </Stack>
      {selectCallback && (
        <CardActions>
          <Button
            onClick={() => {
              selectCallback(zone);
            }}
          >
            Select
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default ZoneCard;

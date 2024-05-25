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
} from "@mui/icons-material";
import { useAppDispatch } from "../../../../app/hooks";
import IconContent from "../../IconInt/IconInt";

interface NationCardProps {
  nation: Nation;
  zones: Zone[];
  selectCallback?: (nation: Nation) => void;
}

const NationCard = (props: NationCardProps) => {
  const { nation, zones, selectCallback } = props;
  return (
    <Card>
      <CardHeader title={nation.name} />
      <Divider />
      <Stack direction="row" spacing={1} padding="1rem" paddingBottom={0}>
        <Tooltip title="Population">
          <IconContent
            Icon={PeopleIcon}
            content={100}
            label="Nation Population"
          />
        </Tooltip>
        <Tooltip title="Zones">
          <IconContent
            Icon={LocationCityIcon}
            content={Object.keys(zones).length}
            label="Nation Zones"
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
              selectCallback(nation);
            }}
          >
            Select
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default NationCard;

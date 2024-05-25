import {
  Card,
  CardHeader,
  Divider,
  CardActions,
  Button,
  Typography,
  Box,
  Stack,
  Tooltip,
} from "@mui/material";
import {
  Badge as BadgeIcon,
  Apartment as ApartmentIcon,
  LocalHospital as LocalHospitalIcon,
  GppMaybe as GppMaybeIcon,
  Work as WorkIcon,
  PsychologyAlt as PsychologyAltIcon,
} from "@mui/icons-material";
import { selectEntity } from "../../../../features/selectionSlice";
import { useAppDispatch } from "../../../../app/hooks";
import { Person } from "empire-of-evil/src/types/interfaces/entities";

type CitizenCardProps = {
  person: Person;
  showDescriptoryIcons?: boolean;
  selectedCitizen?: (person: Person) => void;
};
const CitizenCard = ({
  person,
  showDescriptoryIcons,
  selectedCitizen,
}: CitizenCardProps) => {
  const dispatch = useAppDispatch();
  return (
    <Card>
      <CardHeader
        title={person.name}
        titleTypographyProps={{ variant: "body1" }}
      />
      <Divider />
      {person.dead && (
        <Typography variant="overline" sx={{ paddingX: "1rem" }}>
          Deceased
        </Typography>
      )}
      {person.intelAttributes.intelligenceLevel < 50 ? (
        <Typography variant="body2" sx={{ padding: "1rem" }}>
          More intelligence required to create a profile.
        </Typography>
      ) : (
        <Box>
          {showDescriptoryIcons && (
            <Stack direction="row" spacing={1} padding="1rem" flexWrap={"wrap"}>
              <Tooltip title={person.residentAt ? "Housed" : "Unhoused"}>
                <ApartmentIcon
                  color={person.residentAt ? "inherit" : "error"}
                />
              </Tooltip>
              {person.agent && (
                <Tooltip title="Agent">
                  <BadgeIcon />
                </Tooltip>
              )}
              {person.hospitalizedAt && (
                <Tooltip title="Hospitalized">
                  <LocalHospitalIcon />
                </Tooltip>
              )}
              {person.isCaptive && (
                <Tooltip title="Captive">
                  <GppMaybeIcon />
                </Tooltip>
              )}
              {person.personnelAt && (
                <Tooltip title="Employed">
                  <WorkIcon />
                </Tooltip>
              )}
            </Stack>
          )}
        </Box>
      )}
      <Divider />
      <CardActions>
        <Button
          onClick={() => {
            dispatch(
              selectEntity({
                type: "person",
                selection: person,
              })
            );
            dispatch(
              selectEntity({
                type: "zone",
                selection: null,
              })
            );
          }}
        >
          Surveillance
        </Button>
      </CardActions>
    </Card>
  );
};

export default CitizenCard;

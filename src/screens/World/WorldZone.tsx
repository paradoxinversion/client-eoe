import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import MetricNumber from "../../elements/MetricNumber/MetricNumber";
import ZoneDataGrid from "../../dataGrids/zoneDataGrid";
import { GameManager } from "empire-of-evil";
import { Nation } from "empire-of-evil/src/types/interfaces/entities";
import { getZones } from "empire-of-evil/src/actions/zones";
import { useAppSelector } from "../../app/hooks";
import { getPeople } from "empire-of-evil/src/actions/people";
import PersonDataGrid from "../../dataGrids/personDataGrid";
import BuildingDataGrid from "../../dataGrids/buildingDataGrid";
import { getBuildings } from "empire-of-evil/src/buildings";

interface WorldZoneProps {
  gameManager: GameManager;
}

const WorldZone = ({ gameManager }: WorldZoneProps) => {
  const selectedZone = useAppSelector((state) => state.selections.zone);
  return (
    <Box>
      <Stack direction={"row"} spacing="1rem" padding="1rem">
        <MetricNumber
          number={
            getPeople(gameManager, {
              zoneId: selectedZone.id,
            }).length
          }
          title="People"
        />
        <MetricNumber
          number={
            getBuildings(gameManager, {
              zoneId: selectedZone.id,
            }).length
          }
          title="Buildings"
        />
      </Stack>
      <Divider />
      <Box padding="1rem">
        <Typography>{selectedZone.name}</Typography>
      </Box>
      <Box padding="1rem">
        <Accordion>
          <AccordionSummary>People</AccordionSummary>
          <AccordionDetails>
            <PersonDataGrid
              title="people"
              people={getPeople(gameManager, {
                zoneId: selectedZone.id,
              })}
              gameManager={gameManager}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary>Zone Morgue</AccordionSummary>
          <AccordionDetails>
            <PersonDataGrid
              title="morgue"
              people={getPeople(gameManager, {
                zoneId: selectedZone.id,
                deceasedOnly: true,
              })}
              gameManager={gameManager}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary>Buildings</AccordionSummary>
          <AccordionDetails>
            <BuildingDataGrid
              title=""
              buildings={getBuildings(gameManager, {
                zoneId: selectedZone.id,
              })}
              gameManager={gameManager}
            />
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default WorldZone;

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
import { actions, buildings } from "empire-of-evil";
import { useAppSelector } from "../../app/hooks";
import PersonDataGrid from "../../dataGrids/personDataGrid";
import BuildingDataGrid from "../../dataGrids/buildingDataGrid";
import { IntegratedManagerProps } from "../..";

const WorldZone = ({ gameManager }: IntegratedManagerProps) => {
  const selectedZone = useAppSelector((state) => state.selections.zone);
  return (
    <Box>
      <Stack direction={"row"} spacing="1rem" padding="1rem">
        <MetricNumber
          number={
            actions.people.getPeople(gameManager, {
              zoneId: selectedZone.id,
            }).length
          }
          title="People"
        />
        <MetricNumber
          number={
            buildings.getBuildings(gameManager, {
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
              people={actions.people.getPeople(gameManager, {
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
              people={actions.people.getPeople(gameManager, {
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
              buildings={buildings.getBuildings(gameManager, {
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

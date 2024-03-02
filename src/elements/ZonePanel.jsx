import { numberWithErrorMargin } from "empire-of-evil/src/utilities";
import { getZoneCitizens } from "empire-of-evil/src/zones";
import { toDataArray } from "../utilities/dataHelpers";
import { GameManager } from "empire-of-evil";
import { Box, Card, CardContent, Typography } from "@mui/material";
import DataGrid from 'react-data-grid';

const zonePanelColumns = [
  {key: "zone", name: "Zone"},
  {key: "citizens", name: "Citizens"},
  {key: "civillians", name: "Civillians"},
  {key: "intel", name: "Intel Confidence"},
];

const ZonePanel = ({ title, zones, gameManager }) => {
  const {gameData} = gameManager;
  const zonePanelRows = zones.map((zone) => ({
      zone: zone.name,
      citizens: `${parseInt(numberWithErrorMargin(getZoneCitizens(gameManager, zone.id, false, true).length, zone.intelligenceLevel))}${zone.intelligenceLevel !== 100 && "?"}`,
      civillians: `${parseInt(numberWithErrorMargin(getZoneCitizens(gameManager, zone.id, true, true).length, zone.intelligenceLevel))}${zone.intelligenceLevel !== 100 && "?"}`,
      intel: zone.intelligenceLevel,
  }))

  return (
    <Box component={"section"}>
      <Box component={"header"}>
        <p>{title}</p>
      </Box>
      <DataGrid rows={zonePanelRows} columns={zonePanelColumns} />
    </Box>
  );
};

export default ZonePanel;

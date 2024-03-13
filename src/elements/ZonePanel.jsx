import { numberWithErrorMargin } from "empire-of-evil/src/utilities";
import { getZoneCitizens } from "empire-of-evil/src/zones";
import { toDataArray } from "../utilities/dataHelpers";
import { GameManager } from "empire-of-evil";
import { Box, Card, CardContent, Paper, Typography } from "@mui/material";
import DataGrid from "react-data-grid";

const zonePanelColumns = [
  { key: "zone", name: "Zone" },
  { key: "citizens", name: "Citizens" },
  { key: "civillians", name: "Civillians" },
  { key: "intel", name: "Intel Confidence" },
];

const ZonePanel = ({
  title,
  zones,
  gameManager,
  withErrorMargin = true,
} = {}) => {
  const { gameData } = gameManager;
  const zonePanelRows = zones.map((zone) => {
    const trueCitizensTotal = getZoneCitizens(
      gameManager,
      zone.id,
      false,
      true
    ).length;
    const trueCivilliansTotal = getZoneCitizens(
      gameManager,
      zone.id,
      true,
      true
    ).length;
    const { id, intelligenceLevel } = zone;
    return {
      zone: zone.name,
      citizens: withErrorMargin
        ? `${parseInt(
            numberWithErrorMargin(trueCitizensTotal, intelligenceLevel)
          )}${intelligenceLevel !== 100 ? "?" : ""}`
        : trueCitizensTotal,
      civillians: withErrorMargin
        ? `${parseInt(
            numberWithErrorMargin(trueCivilliansTotal, intelligenceLevel)
          )}${intelligenceLevel !== 100 ? "?" : ""}`
        : trueCivilliansTotal,
      intel: zone.intelAttributes.intelligenceLevel,
    };
  });

  return (
    <Box component={"section"}>
      <Box component={"header"}>
        <Typography variant="overline">{title}</Typography>
      </Box>
      <Paper>
        <DataGrid rows={zonePanelRows} columns={zonePanelColumns} />
      </Paper>
    </Box>
  );
};

export default ZonePanel;

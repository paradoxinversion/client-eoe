import { getNationCitizens } from "empire-of-evil/src/nations";
import { getAgents } from "empire-of-evil/src/organization";
import { useState } from "react";
import { toDataArray } from "../../utilities/dataHelpers";
import { Box, Toolbar, Typography, Divider, Paper, Card } from "@mui/material";
import DataGrid from "react-data-grid";
import { dataGridButton } from "../../datagridRenderers/dataGridButton";
import { selectEntity } from "../../features/selectionSlice";
import MetricNumber from "../../elements/MetricNumber/MetricNumber";
import { getZones } from "empire-of-evil/src/actions/zones";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ZoneDataGrid from "../../dataGrids/zoneDataGrid";
import WorldNation from "./WorldNation";
import WorldOverview from "./WorldOverview";
import WorldZone from "./WorldZone";
import WorldPerson from "./WorldPerson";

const WorldScreen = ({ gameManager }) => {
  const dispatch = useAppDispatch();
  const selectedNation = useAppSelector((state) => state.selections.nation);
  const selectedZone = useAppSelector((state) => state.selections.zone);
  const selectedPerson = useAppSelector((state) => state.selections.person);
  const { gameData } = gameManager;
  const nationsArray = toDataArray(gameData.nations);
  return (
    <>
      <Box component="header" padding="1rem">
        <Typography variant="h3">World</Typography>
      </Box>
      <Divider />
      {selectedNation ? (
        <WorldNation gameManager={gameManager} />
      ) : selectedZone ? (
        <WorldZone gameManager={gameManager} />
      ) : selectedPerson ? (
        <WorldPerson gameManager={gameManager} />
      ) : (
        <WorldOverview gameManager={gameManager} />
      )}
    </>
  );
};

export default WorldScreen;

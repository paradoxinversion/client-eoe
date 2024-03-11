import { getNationCitizens } from "empire-of-evil/src/nations";
import { getAgents } from "empire-of-evil/src/organization";
import { useState } from "react";
import ZonePanel from "../elements/ZonePanel";
import { toDataArray } from "../utilities/dataHelpers";
import MetricCard from "../elements/MetricCard/MetricCard";
import Modal from "../elements/Modal";
import {
  Box,
  Button,
  Grid,
  Toolbar,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Paper,
  Card,
} from "@mui/material";
import DataGrid from "react-data-grid";
import { dataGridButton } from "../datagridRenderers/dataGridButton";
import { useDispatch, useSelector } from "react-redux";
import { selectEntity } from "../features/selectionSlice";
import MetricNumber from "../elements/MetricNumber/MetricNumber";
import { getZones } from "empire-of-evil/src/actions/zones";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import ZoneDataGrid from "../dataGrids/zoneDataGrid";
const eoe = require("empire-of-evil");

const nationsTableColumns = [
  { key: "nation", name: "Nation" },
  { key: "population", name: "Population" },
  { key: "zones", name: "Zones" },
  { key: "agents", name: "Agents" },
  { key: "viewNation", name: "View Nation", renderCell: dataGridButton },
];
const WorldScreen = ({ gameManager }) => {
  const dispatch = useAppDispatch();
  const [nationDialogOpen, setNationDialogOpen] = useState(true);
  const selectedNation = useAppSelector((state) => state.selections.nation);
  const { gameData } = gameManager;
  // const [selectedNation, setSelectedNation] = useState(null);

  const peopleArray = toDataArray(gameData.people);
  const nationsArray = toDataArray(gameData.nations);
  const nationAgents =
    selectedNation && getAgents(gameManager, selectedNation.organizationId);

  const nationsRows = nationsArray
    // .filter((nation) => nation.id !== gameData.player.empireId)
    .map((nation) => ({
      nation: nation.name,
      population: getNationCitizens(gameManager, nation.id).length,
      agents: getAgents(gameManager, nation.organizationId).length,
      zones: nation.size,
      viewNation: () => {
        dispatch(
          selectEntity({
            type: "nation",
            selection: nation,
          })
        );
      },
    }));
  return (
    <Box component="main">
      <Toolbar />
      <Box component="header" padding="1rem">
        <Typography variant="h3">World</Typography>
      </Box>
      <Divider />
      {selectedNation ? (
        <Box>
          <Box padding="1rem">
            <MetricNumber
              number={
                getZones(gameManager, {
                  organizationId: selectedNation.organizationId,
                }).length
              }
              title="Zones"
            />
          </Box>
          <Divider />
          <Box padding="1rem">
            <Typography>{selectedNation.name}</Typography>
          </Box>
          <Box padding="1rem">
            <ZoneDataGrid
              gameManager={gameManager}
              zones={getZones(gameManager, {
                organizationId: selectedNation.organizationId,
              })}
              title=""
            />
          </Box>
        </Box>
      ) : (
        <Box>
          <Box padding="1rem">
            <Box component="header">
              <Typography variant={"overline"}>World Nations</Typography>
            </Box>
            <Card>
              <Paper>
                <DataGrid rows={nationsRows} columns={nationsTableColumns} />
              </Paper>
            </Card>
          </Box>
        </Box>
      )}
      {/* <Dialog open={nationDialogOpen}>
        <DialogTitle>{selectedNation?.name}</DialogTitle>
        <Divider />
        <DialogContent>
          <Box>
            <Box >
              <Typography>Nation Size: {selectedNation?.size}</Typography>
              <Typography>
                Nation Citizens:{" "}
                {
                  eoe.citizens.getCitizens(peopleArray, selectedNation?.id)
                    .length
                }
              </Typography>
              <Typography>Nation Agents: {nationAgents?.length}</Typography>
            </Box>
            <ZonePanel
              title={`${
                eoe.zones.getZones(gameManager, selectedNation?.id).length
              } Zones`}
              zones={eoe.zones.getZones(gameManager, selectedNation?.id)}
              gameData={gameData}
              gameManager={gameManager}
            />
          </Box>
          <Button
            onClick={() => {
              dispatch(
                selectEntity({
                  type: "nation",
                  selection: null,
                })
              );
            }}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog> */}
    </Box>
  );
};

export default WorldScreen;

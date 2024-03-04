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
const eoe = require("empire-of-evil");

const nationsTableColumns = [
  { key: "nation", name: "Nation" },
  { key: "population", name: "Population" },
  { key: "zones", name: "Zones" },
  { key: "agents", name: "Agents" },
  { key: "viewNation", name: "View Nation", renderCell: dataGridButton },
];
const WorldScreen = ({ gameManager }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const selectedNation = useSelector((state) => state.selections.nation);
  const { gameData } = gameManager;
  // const [selectedNation, setSelectedNation] = useState(null);

  const peopleArray = toDataArray(gameData.people);
  const nationsArray = toDataArray(gameData.nations);
  const nationAgents =
    selectedNation && getAgents(gameManager, selectedNation.organizationId);

  const nationsRows = nationsArray
    .filter((nation) => nation.id !== gameData.player.empireId)
    .map((nation) => ({
      nation: nation.name,
      population: getNationCitizens(gameManager, nation.id).length,
      agents: getAgents(gameManager, nation.organizationId).length,
      zones: nation.size,
      cb: () => {
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
      <Dialog open={!!selectedNation}>
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
              // setSelectedNation(null)
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
      </Dialog>
      <Box>
        <Box component="header" padding="1rem">
          <Typography variant="h3">World</Typography>
        </Box>
        <Divider />
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
    </Box>
  );
};

export default WorldScreen;

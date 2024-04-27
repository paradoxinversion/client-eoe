import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
  Tab,
} from "@mui/material";
import { buildings, actions, GameManager } from "empire-of-evil";
import BuildingDataGrid from "../../dataGrids/buildingDataGrid";
import ZoneDataGrid from "../../dataGrids/zoneDataGrid";
import { selectEntity } from "../../features/selectionSlice";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const InfrastructureOverview = () => {
  const dispatch = useAppDispatch();
  const buildingsState = useAppSelector((state) => state.buildings);
  const [currentTab, setCurrentTab] = useState("zones");
  const [currentBuildingTab, setCurrentBuildingTab] = useState("hospitals");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };
  return (
    <>
      <Box sx={{ typography: "body1" }}>
        <TabContext value={currentTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Zones" value="zones" />
              <Tab label="Buildings" value="buildings" />
            </TabList>
          </Box>
          <TabPanel value="zones">
            <Box id="zones" padding="1rem">
              <Box>
                <Typography>Zones</Typography>
              </Box>
              <ZoneDataGrid
                zones={actions.zones.getZones({
                  nationId: GameManager.getInstance().gameData.player.empireId,
                })}
                title={"Zones"}
              />
            </Box>
          </TabPanel>
          <TabPanel value="buildings">
            <TabContext value={currentBuildingTab}>
              <Box>
                <TabList>
                  <Tab
                    label="Hospitals"
                    value="hospitals"
                    onClick={() => setCurrentBuildingTab("hospitals")}
                  />
                  <Tab
                    label="Laboratories"
                    value="laboratories"
                    onClick={() => setCurrentBuildingTab("laboratories")}
                  />
                  <Tab
                    label="Banks"
                    value="banks"
                    onClick={() => setCurrentBuildingTab("banks")}
                  />
                  <Tab
                    label="Apartments"
                    value="apartments"
                    onClick={() => setCurrentBuildingTab("apartments")}
                  />
                  <Tab
                    label="Offices"
                    value="offices"
                    onClick={() => setCurrentBuildingTab("offices")}
                  />
                </TabList>
              </Box>
              <TabPanel value="hospitals">
                <BuildingDataGrid
                  gridHeight={"200px"}
                  buildings={buildings.getBuildings({
                    type: "hospital",
                    organizationId:
                      GameManager.getInstance().gameData.player.organizationId,
                  })}
                  title={"Hospitals"}
                  cb={(entity) => {
                    dispatch(
                      selectEntity({
                        type: "building",
                        selection: buildingsState[entity.id],
                      })
                    );
                  }}
                />
              </TabPanel>
              <TabPanel value="laboratories">
                <BuildingDataGrid
                  gridHeight={"200px"}
                  buildings={buildings.getBuildings({
                    type: "laboratory",
                    organizationId:
                      GameManager.getInstance().gameData.player.organizationId,
                  })}
                  title={"Laboraties"}
                  cb={(entity) => {
                    dispatch(
                      selectEntity({
                        type: "building",
                        selection: buildingsState[entity.id],
                      })
                    );
                  }}
                />
              </TabPanel>
              <TabPanel value="banks">
                <BuildingDataGrid
                  gridHeight={"200px"}
                  buildings={buildings.getBuildings({
                    type: "bank",
                    organizationId:
                      GameManager.getInstance().gameData.player.organizationId,
                  })}
                  title={"Bank"}
                  cb={(entity) => {
                    dispatch(
                      selectEntity({
                        type: "building",
                        selection: buildingsState[entity.id],
                      })
                    );
                  }}
                />
              </TabPanel>
              <TabPanel value="apartments">
                <BuildingDataGrid
                  gridHeight={"200px"}
                  buildings={buildings.getBuildings({
                    type: "apartment",
                    organizationId:
                      GameManager.getInstance().gameData.player.organizationId,
                  })}
                  title={"Apartments"}
                  cb={(entity) => {
                    console.log("Select", entity);
                    dispatch(
                      selectEntity({
                        type: "building",
                        selection: buildingsState[entity.id],
                      })
                    );
                  }}
                />
              </TabPanel>
              <TabPanel value="offices">
                <BuildingDataGrid
                  gridHeight={"200px"}
                  buildings={buildings.getBuildings({
                    type: "office",
                    organizationId:
                      GameManager.getInstance().gameData.player.organizationId,
                  })}
                  title={"Offices"}
                  cb={(entity) => {
                    console.log("Select", entity);
                    dispatch(
                      selectEntity({
                        type: "building",
                        selection: buildingsState[entity.id],
                      })
                    );
                  }}
                />
              </TabPanel>
            </TabContext>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default InfrastructureOverview;

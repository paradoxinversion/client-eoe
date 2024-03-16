import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
  Tab,
} from "@mui/material";
import { buildings, actions } from "empire-of-evil";
import BuildingDataGrid from "../../dataGrids/buildingDataGrid";
import ZoneDataGrid from "../../dataGrids/zoneDataGrid";
import { selectEntity } from "../../features/selectionSlice";
import { IntegratedManagerProps } from "../..";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const InfrastructureOverview = ({ gameManager }: IntegratedManagerProps) => {
  const dispatch = useAppDispatch();
  const buildingsState = useAppSelector((state) => state.buildings);
  const [currentTab, setCurrentTab] = useState("zones");

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
                gameManager={gameManager}
                zones={actions.zones.getZones(gameManager, {
                  nationId: gameManager.gameData.player.empireId,
                })}
                title={"Zones"}
              />
            </Box>
          </TabPanel>
          <TabPanel value="buildings">
            <Box id="buildings" padding="1rem">
              <Box>
                <Typography>Buildings</Typography>
              </Box>
              <Accordion>
                <AccordionSummary>Laboratories</AccordionSummary>
                <AccordionDetails>
                  <BuildingDataGrid
                    gridHeight={"200px"}
                    gameManager={gameManager}
                    buildings={buildings.getBuildings(gameManager, {
                      type: "laboratory",
                      organizationId:
                        gameManager.gameData.player.organizationId,
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
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary>Banks</AccordionSummary>
                <AccordionDetails>
                  <BuildingDataGrid
                    gridHeight={"200px"}
                    gameManager={gameManager}
                    buildings={buildings.getBuildings(gameManager, {
                      type: "bank",
                      organizationId:
                        gameManager.gameData.player.organizationId,
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
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary>Apartments</AccordionSummary>
                <AccordionDetails>
                  <BuildingDataGrid
                    gridHeight={"200px"}
                    gameManager={gameManager}
                    buildings={buildings.getBuildings(gameManager, {
                      type: "apartment",
                      organizationId:
                        gameManager.gameData.player.organizationId,
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
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary>Offices</AccordionSummary>
                <AccordionDetails>
                  <BuildingDataGrid
                    gridHeight={"200px"}
                    gameManager={gameManager}
                    buildings={buildings.getBuildings(gameManager, {
                      type: "office",
                      organizationId:
                        gameManager.gameData.player.organizationId,
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
                </AccordionDetails>
              </Accordion>
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default InfrastructureOverview;

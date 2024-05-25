import { Box, Typography, Tab, Grid } from "@mui/material";
import { managers, actions } from "empire-of-evil";
import ZoneDataGrid from "../../../dataGrids/zoneDataGrid";

import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Gauge } from "@mui/x-charts";
import BuildingCard from "../../../elements/Cards/BuildingCard/BuildingCard";

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
                  nationId:
                    managers.game.GameManager.getInstance().gameData.player
                      .empireId,
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
                <Grid container spacing={1}>
                  {actions.buildings
                    .getBuildings({
                      type: "hospital",
                      organizationId:
                        managers.game.GameManager.getInstance().gameData.player
                          .organizationId,
                    })
                    .map((building) => {
                      return (
                        <Grid item>
                          <BuildingCard building={building} />
                        </Grid>
                      );
                    })}
                </Grid>
              </TabPanel>
              <TabPanel value="laboratories">
                <Grid container spacing={1}>
                  {actions.buildings
                    .getBuildings({
                      type: "laboratory",
                      organizationId:
                        managers.game.GameManager.getInstance().gameData.player
                          .organizationId,
                    })
                    .map((building) => {
                      return (
                        <Grid item>
                          <BuildingCard building={building} />
                        </Grid>
                      );
                    })}
                </Grid>
              </TabPanel>
              <TabPanel value="banks">
                <Grid container spacing={1}>
                  {actions.buildings
                    .getBuildings({
                      type: "bank",
                      organizationId:
                        managers.game.GameManager.getInstance().gameData.player
                          .organizationId,
                    })
                    .map((building) => {
                      return (
                        <Grid item>
                          <BuildingCard building={building} />
                        </Grid>
                      );
                    })}
                </Grid>
              </TabPanel>
              <TabPanel value="apartments">
                <Box>
                  <Typography>Housed People</Typography>
                  <Gauge
                    width={100}
                    height={100}
                    value={
                      actions.people.getPeople({
                        personFilter: {
                          residentsOnly: true,
                          excludeDeceased: true,
                        },
                        nation: {
                          nationId:
                            managers.game.GameManager.getInstance().gameData
                              .player.empireId,
                        },
                      }).length
                    }
                    valueMin={0}
                    valueMax={
                      actions.people.getPeople({
                        personFilter: {
                          excludeDeceased: true,
                        },
                        nation: {
                          nationId:
                            managers.game.GameManager.getInstance().gameData
                              .player.empireId,
                        },
                      }).length
                    }
                  />
                </Box>
                <Grid container spacing={1}>
                  {actions.buildings
                    .getBuildings({
                      type: "apartment",
                      organizationId:
                        managers.game.GameManager.getInstance().gameData.player
                          .organizationId,
                    })
                    .map((building) => {
                      return (
                        <Grid item>
                          <BuildingCard building={building} />
                        </Grid>
                      );
                    })}
                </Grid>
              </TabPanel>
              <TabPanel value="offices">
                <Grid container spacing={1}>
                  {actions.buildings
                    .getBuildings({
                      type: "office",
                      organizationId:
                        managers.game.GameManager.getInstance().gameData.player
                          .organizationId,
                    })
                    .map((building) => {
                      return (
                        <Grid item>
                          <BuildingCard building={building} />
                        </Grid>
                      );
                    })}
                  <Grid item></Grid>
                </Grid>
              </TabPanel>
            </TabContext>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default InfrastructureOverview;

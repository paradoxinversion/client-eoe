import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  Grid,
  Typography,
} from "@mui/material";
import { getPeople } from "empire-of-evil/src/actions/people";
import { getEvilEmpire } from "empire-of-evil/src/organization";
import CaptiveDataGrid from "../../dataGrids/captiveDataGrid";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import CaptiveProfile from "../../elements/profiles/CaptiveProfile";
import { GameManager } from "empire-of-evil";
import { selectEntity } from "../../../features/selectionSlice";

const CaptivesScreen = () => {
  const selectedPerson = useAppSelector((state) => state.selections.person);
  const dispatch = useAppDispatch();
  return (
    <Box>
      <Typography>Captives</Typography>
      <Grid container>
        {getPeople({
          personFilter: {
            excludeDeceased: true,
          },
          captive: {
            capturedBy: getEvilEmpire().id,
          },
        }).map((person) => {
          return (
            <Grid item key={person.id}>
              <Card sx={{ padding: 1 }}>
                <Typography>{person.name}</Typography>
                <Typography>
                  {
                    GameManager.getInstance().gameData.governingOrganizations[
                      person.agent.organizationId
                    ].name
                  }
                </Typography>
                <Button
                  onClick={() => {
                    dispatch(
                      selectEntity({
                        type: "person",
                        selection: person,
                      })
                    );
                  }}
                >
                  Select
                </Button>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      {selectedPerson && <CaptiveProfile />}
    </Box>
  );
};

export default CaptivesScreen;

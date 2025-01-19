import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  Grid,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import CaptiveProfile from "../../../elements/profiles/CaptiveProfile";
import { managers, actions } from "empire-of-evil";
import { selectEntity } from "../../../../features/selectionSlice";

const CaptivesScreen = () => {
  const selectedPerson = useAppSelector((state) => state.selections.person);
  const dispatch = useAppDispatch();
  return (
    <Box>
      <Typography>Captives</Typography>
      <Grid container>
        {actions.people
          .getPeople({
            personFilter: {
              excludeDeceased: true,
            },
            captive: {
              capturedBy: actions.organization.getEvilEmpire().id,
            },
          })
          .map((person) => {
            return (
              <Grid item key={person.id}>
                <Card sx={{ padding: 1 }}>
                  <Typography>{person.name}</Typography>
                  <Typography>
                    {
                      managers.game.GameManager.getInstance().gameData
                        .governingOrganizations[person.agent.organizationId]
                        .name
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

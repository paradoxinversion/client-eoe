import { Box, Typography, Divider } from "@mui/material";
import { useAppSelector } from "../../../../app/hooks";
import WorldNation from "./WorldNation";
import WorldOverview from "./WorldOverview";
import WorldZone from "./WorldZone";
import WorldPerson from "./WorldPerson";
import { managers } from "empire-of-evil";
const WorldScreen = () => {
  const selectedNation = useAppSelector((state) => state.selections.nation);
  const selectedZone = useAppSelector((state) => state.selections.zone);
  const selectedPerson = useAppSelector((state) => state.selections.person);
  return (
    <>
      <Box component="header" padding="1rem">
        <Typography variant="h3">World</Typography>
      </Box>
      <Divider />
      {selectedNation ? (
        <WorldNation selectedNation={selectedNation} />
      ) : selectedZone ? (
        <WorldZone selectedZone={selectedZone} />
      ) : selectedPerson ? (
        <WorldPerson
          selectedPerson={selectedPerson}
          homeZone={
            managers.game.GameManager.getInstance().gameData.zones[
              selectedPerson.homeZoneId
            ]
          }
          nativeNation={
            managers.game.GameManager.getInstance().gameData.nations[
              selectedPerson.nationId
            ]
          }
          activities={
            managers.game.GameManager.getInstance().gameData.gameLog.simActions
              .people[selectedPerson.id]
          }
        />
      ) : (
        <WorldOverview />
      )}
    </>
  );
};

export default WorldScreen;

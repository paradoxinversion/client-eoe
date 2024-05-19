import { Box, Typography, Divider } from "@mui/material";
import { useAppSelector } from "../../../app/hooks";
import WorldNation from "./WorldNation";
import WorldOverview from "./WorldOverview";
import WorldZone from "./WorldZone";
import WorldPerson from "./WorldPerson";

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
        <WorldNation />
      ) : selectedZone ? (
        <WorldZone />
      ) : selectedPerson ? (
        <WorldPerson />
      ) : (
        <WorldOverview />
      )}
    </>
  );
};

export default WorldScreen;

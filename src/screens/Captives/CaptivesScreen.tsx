import { Box } from "@mui/material";
import { getPeople } from "empire-of-evil/src/actions/people";
import { getEvilEmpire } from "empire-of-evil/src/organization";
import CaptiveDataGrid from "../../dataGrids/captiveDataGrid";
import { useAppSelector } from "../../app/hooks";
import CaptiveProfile from "../../elements/profiles/CaptiveProfile";

const CaptivesScreen = ({ gameManager }) => {
  const selectedPerson = useAppSelector((state) => state.selections.person);
  return (
    <Box>
      <CaptiveDataGrid
        gameManager={gameManager}
        people={getPeople(gameManager, {
          excludeDeceased: true,
          captive: {
            capturedBy: getEvilEmpire(gameManager).id,
          },
        })}
      />
      {selectedPerson && <CaptiveProfile gameManager={gameManager} />}
    </Box>
  );
};

export default CaptivesScreen;

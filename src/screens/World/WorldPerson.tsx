import { Box, Typography } from "@mui/material";
import { GameManager } from "empire-of-evil";
import { useAppSelector } from "../../app/hooks";
import { IntegratedManagerProps } from "../..";

const WorldPerson = ({ gameManager }: IntegratedManagerProps) => {
  const selectedPerson = useAppSelector((state) => state.selections.person);
  return (
    <Box>
      <Box padding="1rem">
        <Typography>{selectedPerson.name}</Typography>
      </Box>
      <Box padding="1rem"></Box>
    </Box>
  );
};

export default WorldPerson;

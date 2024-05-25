import { Chip } from "@mui/material";

export type SelectorChipProps = {
  label: string;
  selected: boolean;
  onClick: () => void;
  name?: string;
  id?: string;
};

const SelectorChip = ({
  id,
  name,
  label,
  selected,
  onClick,
}: SelectorChipProps) => (
  <Chip
    id={id}
    name={name}
    component={"button"}
    label={label}
    variant={selected ? "outlined" : "filled"}
    onClick={onClick}
  />
);

export default SelectorChip;

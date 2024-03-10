import { Button } from "@mui/material";

export function dataGridButton(cellData) {
  const key = cellData.column.key;
  const row = cellData.row;

  const fn = row[key];
  console.log(fn)
  return (
    <Button
      onClick={() => {
        // console.log(key);
        
        fn && fn(row);
      }}
    >
      {cellData.column.name}
    </Button>
  );
}

import { Button } from "@mui/material";

export function dataGridButton(cellData) {
  const key = cellData.column.key;
  const row = cellData.row;

  const fn = row[key];
  return (
    <Button
      onClick={() => {
        // console.log(key);
        // console.log(cellData)
        fn && fn(row);
        // row.cb && row.cb(row);
      }}
    >
      {cellData.column.name}
    </Button>
  );
}

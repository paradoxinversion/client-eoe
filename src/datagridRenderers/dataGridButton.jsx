import { Button } from "@mui/material";

export function dataGridButton (row) {
    // console.log(row)
    return <Button onClick={()=>{
        row.row.cb && row.row.cb(row.row);
    }}>{row.column.name}</Button>
}
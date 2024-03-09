import { Button } from "@mui/material";

export function dataGridButton (row) {
    // console.log(row)
    return <Button onClick={()=>{
        console.log("foo")
        debugger
        row.row.cb && row.row.cb(row.row);
    }}>{row.column.name}</Button>
}
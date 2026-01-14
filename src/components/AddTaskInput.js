import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import "../styles/AddTaskInput.css"

export default function BasicTextFields() {
  const [addTask, setAddTask] = useState("");
  return (
    <Box
      component="form"
      sx={{ "& > :not(style)": { m: 1, } }}
      noValidate
      autoComplete="off"
    >
      <button>إضافة</button>
      <TextField
        id="outlined-basic"
        label="عنوان المهمة"
        variant="outlined"
        value={addTask}
        onChange={(event) => {
          setAddTask(event.target.value);
        }}
      />
    </Box>
  );
}

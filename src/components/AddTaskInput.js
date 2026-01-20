import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import TaskCard from "./TaskCard";
import "../styles/AddTaskInput.css";

export default function BasicTextFields() {
  const [addTask, setAddTask] = useState("");

  function clickAddButton() {
    (<TaskCard title={addTask} />);
  }
  return (
    <>
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1 }, direction: "rtl" }}
        noValidate
        autoComplete="off"
        className="boxInput"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <TextField
          id="outlined-basic"
          label="عنوان المهمة"
          variant="outlined"
          value={addTask}
          onChange={(event) => {
            setAddTask(event.target.value);
          }}
        />

        <button onClick={clickAddButton} className="addButton">
          إضافة
        </button>
      </Box>
    </>
  );
}

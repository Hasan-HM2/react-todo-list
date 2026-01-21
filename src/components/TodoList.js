import { Link } from "react-router-dom";
import "../App.css";
import "../styles/AddTaskInput.css";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { useState } from "react";
import TodoCard from "./TodoCard.js";

// DATA
import { initTodos } from "../todosData";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function TodoList() {
  const [todos, setTodos] = useState(initTodos);
  const [addTaskTitle, setAddTaskTitle] = useState("");

  let todo = todos.map((item) => {
    return (
      <TodoCard
        key={item.id}
        title={item.title}
        details={item.details}
        isComplete={item.isCompleted}
      />
    );
  });
  return (
    <>
      <div className="div-title">
        <h1>مهامي</h1>
        <hr />
      </div>
      <div className="flex">
        <Stack
          className="nav"
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={1}
        >
          <Link className="link" to="/">
            <Item sx={{ fontSize: "18px" }} className="navItemText">
              غير منجز
            </Item>
          </Link>

          <Link className="link" to="">
            <Item sx={{ fontSize: "18px" }} className="navItemText">
              منجز
            </Item>
          </Link>

          <Link className="link" to="">
            <Item sx={{ fontSize: "18px" }} className="navItemText">
              الكل
            </Item>
          </Link>
        </Stack>
      </div>

      <div>{todo}</div>

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
          value={addTaskTitle}
          onChange={(event) => {
            setAddTaskTitle(event.target.value);
          }}
        />

        <button
          onClick={() => {
            alert("test");
          }}
          className="addButton"
        >
          إضافة
        </button>
      </Box>
    </>
  );
}

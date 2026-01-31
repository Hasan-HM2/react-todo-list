import { Link } from "react-router-dom";
import "../App.css";
import "../styles/AddTaskInput.css";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import TodoCard from "./TodoCard.js";
import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";
import { TodosConetext } from "../context/todosContext.js";

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
  const { todos, setTodos } = useContext(TodosConetext)
  const [addTaskTitle, setAddTaskTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true); // حالة جديدة لمعرفة ما إذا كان التحميل انتهى

  // USE EFFECT
  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos"))
    setTodos(storageTodos || [])
    setIsLoading(false); // انتهى التحميل
  }, [])
  // ==== USE EFFECT ====

  // Handle Click Add Button
  function handleClickAddButton() {
    let newTodo = {
      id: uuidv4(),
      title: addTaskTitle,
      details: "",
      isCompleted: false,
    };

    const updatedTodos = [...todos, newTodo]
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos))
    setAddTaskTitle("");
  }
  // ==== Handle Click Add Button ====

  // عرض المحتوى بناءً على حالة التحميل ووجود المهام
  const renderTodos = () => {
    // إذا كان التحميل لا يزال جارياً
    if (isLoading) {
      return <p className="loading-message">جاري التحميل...</p>;
    }

    // إذا انتهى التحميل ولا توجد مهام
    if (!todos || todos.length === 0) {
      return (
        <div className="empty-list-message">
          <p style={{ textAlign: "center", fontSize: "18px", color: "#666" }}>
            القائمة فارغة
          </p>
          <p style={{ textAlign: "center", fontSize: "14px", color: "#888" }}>
            ابدأ بإضافة مهمة جديدة
          </p>
        </div>
      );
    }

    // إذا كانت هناك مهام، اعرضها
    return todos.map((item) => {
      return (
        <TodoCard key={item.id} todo={item} />
      );
    });
  };

  return (
    <>
      {/* NAV BAR */}
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
          <Link className="link" to="/notcompleted">
            <Item sx={{ fontSize: "18px" }} className="navItemText">
              غير منجز
            </Item>
          </Link>

          <Link className="link" to="/completed">
            <Item sx={{ fontSize: "18px" }} className="navItemText">
              منجز
            </Item>
          </Link>

          <Link className="link" to="/">
            <Item sx={{ fontSize: "18px" }} className="navItemText">
              الكل
            </Item>
          </Link>
        </Stack>
      </div>
      {/* ===== NAV BAR ===== */}

      {/* TODOS */}
      <div>{renderTodos()}</div>
      {/* ===== TODOS ===== */}

      {/* INPUT + ADD BUTTON BOX */}
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1 }, direction: "rtl" }}
        noValidate
        autoComplete="off"
        className="boxInput"
        onSubmit={(event) => {
          event.preventDefault();
          // يمكنك أيضاً التحقق هنا قبل الإضافة
          if (addTaskTitle.trim()) {
            handleClickAddButton();
          }
        }}
      >
        <TextField
          required={true}
          id="outlined-basic"
          label="عنوان المهمة"
          variant="outlined"
          value={addTaskTitle}
          onChange={(event) => {
            setAddTaskTitle(event.target.value);
          }}
          onKeyPress={(event) => {
            // إضافة المهمة عند الضغط على Enter
            if (event.key === 'Enter' && addTaskTitle.trim()) {
              event.preventDefault();
              handleClickAddButton();
            }
          }}
        />

        <button
          onClick={handleClickAddButton}
          className="addButton"
          disabled={!addTaskTitle.trim()} // تعطيل الزر إذا كان الحقل فارغاً
          style={{
            opacity: !addTaskTitle.trim() ? 0.5 : 1,
            cursor: !addTaskTitle.trim() ? 'not-allowed' : 'pointer'
          }}
        >
          إضافة
        </button>
      </Box>
      {/* ===== INPUT + ADD BUTTON BOX ===== */}
    </>
  );
}
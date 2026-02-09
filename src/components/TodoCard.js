import "../styles/TodoCard.css";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import { useState, useContext } from "react";

import { TodosConetext } from "../context/todosContext.js";
import { ToastContext } from "../context/toastContext.js";

const TodoCard = ({ todo, handleClickOpenDelete, handleClickOpenEdit }) => {
  const [completeStatus, setCompleteStatue] = useState(todo.isCompleted);
  const { todos, setTodos } = useContext(TodosConetext)
  const { showHideToast } = useContext(ToastContext)

  function openDelete() {
    handleClickOpenDelete(todo)
  }

  const openEdit = () => {
    handleClickOpenEdit(todo);
  };

  // HANDLE CHECK CLICK FUNCTION
  function handleCheckClick() {
    const updatedTodos = todos.map((item) => {
      if (item.id === todo.id) {
        item.isCompleted = !item.isCompleted
      }
      return item
    })
    if (!completeStatus) {
      showHideToast("تمت الإضافة إلى المهام المنجزة")
    }
    else {
      showHideToast("تمت الإضافة إلى المهام غير المنجزة")
    }
    setTodos(updatedTodos)
    localStorage.setItem("todos", JSON.stringify(updatedTodos))

  }
  // ==== HANDLE CHECK CLICK FUNCTION ====

  return (
    <div className="task-card-container">
      <div className="one-card" >
        <Grid container spacing={0}>
          <Grid
            size={4}
            display="flex"
            justifyContent="space-around"
            alignItems={"center"}
            sx={{ marginTop: { xs: 2, sm: 0 } }}
          >
            {/* DELETE BUTTON */}
            <IconButton
              className="iconButton"
              aria-label="delete"
              style={{
                color: "#78290f",
                background: "white",
                border: "solid #78290f 2px",
              }}
              onClick={openDelete}
            >
              <DeleteIcon />
            </IconButton>
            {/* ==== DELETE BUTTON ==== */}

            {/* EDIT BUTTON */}
            <IconButton
              onClick={openEdit}
              className="iconButton"
              aria-label="delete"
              style={{
                color: "#023e8a",
                background: "white",
                border: "solid #023e8a 2px",
              }}
            >
              <EditIcon />
            </IconButton>
            {/* ==== EDIT BUTTON ==== */}

            {/* CHECK ICON BUTTON */}
            <IconButton
              onClick={() => {
                handleCheckClick()
                setCompleteStatue(prev => !prev)
              }}
              className="iconButton"
              aria-label="delete"
              style={{
                color: completeStatus ? "white" : "#99582a",
                background: completeStatus ? "#59df00" : "white",
                border: "solid #99582a 2px",
              }}
            >
              <CheckIcon />
            </IconButton>
            {/* ==== CHECK ICON BUTTON ==== */}
          </Grid>

          <Grid size={8} className="right" style={{ direction: 'rtl' }}>
            <h2
              style={{
                marginRight: "20px",
                marginBottom: "0px",
                fontSize: "28px",
                textDecoration: todo.isCompleted ? "line-through" : 'none'
              }}
              className="todoCardTextH2"
            >
              {todo.title}
            </h2>

            <h5
              style={{
                marginRight: "20px",
                marginTop: "1px",
                fontWeight: "normal",
              }}
              className="todoCardTextH5"
            >
              {todo.details}
            </h5>

            <div className="addTodoDate">
              <p>تاريخ الإضافة: {todo.createdAt}</p>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default TodoCard;
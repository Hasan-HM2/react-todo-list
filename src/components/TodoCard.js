import "../styles/TodoCard.css";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import { useState } from "react";

import { useContext } from "react";
import { TodosConetext } from "../context/todosContext.js";

// MODAL
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const TodoCard = ({ todo }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { todos, setTodos } = useContext(TodosConetext)
  const [completeStatus, setCompleteStatue] = useState(todo.isCompleted);

  // DELETE FUNCTION
  function handleDeleteConfirm(id) {
    let newTodos = todos.filter((item) => {
      return item.id != todo.id
    })
    setTodos(newTodos)
  }
  // ==== DELETE FUNCTION ====


  // HANDLE CHECK CLICK FUNCTION
  function handleCheckClick() {
    const updatedTodos = todos.map((item) => {
      if (item.id === todo.id) {
        item.isCompleted = !item.isCompleted
      }
      return item
    })
    setTodos(updatedTodos)
  }
  // ==== HANDLE CHECK CLICK FUNCTION ====

  return (
    <div className="task-card-container">

      {/* TODO MODAL */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ direction: 'rtl' }}
      >
        <DialogTitle id="alert-dialog-title">
          {"هل تريد الحذف بالتأكيد؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكنك التراجع في حال تم تأكيد الحذف
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>إلغاء</Button>
          <Button onClick={() => { handleDeleteConfirm(todo.id) }} autoFocus>
            تأكيد الحذف
          </Button>
        </DialogActions>
      </Dialog>
      {/* ==== TODO MODAL ==== */}


      <div className="one-card">
        <Grid container spacing={0}>
          <Grid
            size={4}
            display="flex"
            justifyContent="space-around"
            alignItems={"center"}
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
              onClick={handleClickOpen}
            >
              <DeleteIcon />
            </IconButton>
            {/* ==== DELETE BUTTON ==== */}

            <IconButton
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

          <Grid size={8} className="right">
            <h2
              style={{
                marginRight: "20px",
                marginBottom: "0px",
                fontSize: "28px",
              }}
            >
              {todo.title}
            </h2>
            <h5
              style={{
                marginRight: "20px",
                marginTop: "1px",
                fontWeight: "normal",
              }}
            >
              {todo.details}
            </h5>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default TodoCard;

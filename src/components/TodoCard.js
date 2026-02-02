import "../styles/TodoCard.css";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import { useState, useContext } from "react";

import { TodosConetext } from "../context/todosContext.js";

// MODAL
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

const TodoCard = ({ todo }) => {
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [completeStatus, setCompleteStatue] = useState(todo.isCompleted);
  const [editedTodo, setEditedTodo] = useState({ title: todo.title, details: todo.details })

  const { todos, setTodos } = useContext(TodosConetext)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const email = formJson.email;
    console.log(email);
    handleClose();
  };


  // DELETE FUNCTION
  function handleDeleteConfirm(id) {
    let newTodos = todos.filter((item) => {
      return item.id !== todo.id
    })
    setTodos(newTodos)
    localStorage.setItem("todos", JSON.stringify(newTodos))

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
    localStorage.setItem("todos", JSON.stringify(updatedTodos))

  }
  // ==== HANDLE CHECK CLICK FUNCTION ====

  // HANDLE EDIT CONFIRM
  function handleEditConfirm() {
    const updatedTodos = todos.map((item) => {
      if (item.id === todo.id) {
        return (
          { ...item, title: editedTodo.title, details: editedTodo.details }
        )
      } else return item
    })
    setTodos(updatedTodos)
    localStorage.setItem("todos", JSON.stringify(updatedTodos))

    setOpenEdit(false)
  }
  // ==== HANDLE EDIT CONFIRM ====

  return (
    <div className="task-card-container">

      {/* DELETE TODO MODAL */}
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
          <Button onClick={handleClose} className="cancelDeleteBtn">إلغاء</Button>
          <Button onClick={() => { handleDeleteConfirm(todo.id) }} className="confirmDeleteBtn">
            تأكيد الحذف
          </Button>
        </DialogActions>
      </Dialog>
      {/* ==== DELETE TODO MODAL ==== */}


      {/* EDIT TODO MODAL */}
      <Dialog open={openEdit} onClose={handleCloseEdit} fullWidth sx={{ direction: 'rtl' }}>
        <DialogTitle sx={{ fontSize: '28px', marginBottom: '-16px' }}>تعديل عنوان المهمة</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              autoFocus
              required
              id="name"
              name="text"
              type="text"
              fullWidth
              variant="standard"
              value={editedTodo.title}
              onChange={(e) => { setEditedTodo({ ...editedTodo, title: e.target.value }) }}
            />
          </form>
        </DialogContent>
        <DialogTitle sx={{ marginBottom: '-16px', marginTop: '20px', }}>تعديل تفاصيل المهمة</DialogTitle>
        <DialogContent sx={{ marginTop: '0px' }}>
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              required
              id="name"
              name="text"
              type="text"
              fullWidth
              variant="standard"
              value={editedTodo.details}
              onChange={(e) => { setEditedTodo({ ...editedTodo, details: e.target.value }) }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} variant="outlined" sx={{ marginLeft: '20px' }} className="cancelEditBtn">إلغاء</Button>
          <Button autoFocus variant="contained" className="confirmEditBtn" onClick={handleEditConfirm}>
            حفظ التعديل
          </Button>
        </DialogActions>
      </Dialog>

      {/* ===== EDIT TODO MODAL ==== */}

      <div className="one-card" >
        <Grid container spacing={0}>
          <Grid
            size={{ xs: 12, sm: 4 }}
            display="flex"
            flexDirection={{ xs: "row", sm: "row" }}
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
              onClick={handleClickOpen}
            >
              <DeleteIcon />
            </IconButton>
            {/* ==== DELETE BUTTON ==== */}

            {/* EDIT BUTTON */}
            <IconButton
              onClick={handleClickOpenEdit}
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

          <Grid size={8} className="right" style={{direction:'rtl'}}> 
            <h2
              style={{
                marginRight: "20px",
                marginBottom: "0px",
                fontSize: "28px",
                textDecoration: todo.isCompleted ? "line-through" : 'none'
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

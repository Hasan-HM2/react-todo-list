import "../App.css";
import "../styles/AddTaskInput.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import TodoCard from "./TodoCard.js";
import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";
import { TodosConetext } from "../context/todosContext.js";

// TOGGLE BUTTONS
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

// MODAL
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosConetext)
  const [addTaskTitle, setAddTaskTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true); // حالة جديدة لمعرفة ما إذا كان التحميل انتهى
  const [displayedTodosType, setDisplyedTodosType] = useState("all")
  const [openDelete, setOpenDelete] = useState(false);
  const [dialogTodo, setDialogTodo] = useState(null)
  

    const handleOpenDelete = (todo) => {
    setDialogTodo(todo)
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  
  
    // DELETE FUNCTION
  function handleDeleteConfirm() {
    let newTodos = todos.filter((item) => {
      return item.id !== dialogTodo.id
    })
    setTodos(newTodos)
    localStorage.setItem("todos", JSON.stringify(newTodos))
    setOpenDelete(false)
  }
  // ==== DELETE FUNCTION ====


  // USE EFFECT
  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos"))
    setTodos(storageTodos || [])
    setIsLoading(false);
  }, [])
  // ==== USE EFFECT ====


  // Filteration arrays
  const complatedTodos = todos.filter((item) => {
    if (item.isCompleted) {
      return item
    }
    else return false
  })

  const notComplatedTodos = todos.filter((item) => {
    if (!item.isCompleted) {
      return item
    }
    else return false
  })
  // ==== Filteration arrays ====

  // ADE DATE FUNCTION
  function getCurrentDateTime() {
    let date = new Date();

    function formatTwoDigits(number) {
      return number < 10 ? '0' + number : number;
    }

    let day = formatTwoDigits(date.getDate());
    let month = formatTwoDigits(date.getMonth() + 1);
    let year = date.getFullYear();
    let hours = formatTwoDigits(date.getHours());
    let minutes = formatTwoDigits(date.getMinutes());

    return `${year}/${month}/${day} || ${hours}:${minutes}`;
  }
  // ==== ADE DATE FUNCTION ====

  // Handle Click Add Button
  function handleClickAddButton() {
    let newTodo = {
      id: uuidv4(),
      title: addTaskTitle,
      details: "",
      isCompleted: false,
      createdAt: getCurrentDateTime()
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

    if (displayedTodosType === 'not-completed') {
      return notComplatedTodos.map((item) => {
        return (
          <TodoCard key={item.id} todo={item} handleClickOpenDelete={handleOpenDelete} />
        )
      })
    }

    else if (displayedTodosType === 'completed') {
      return complatedTodos.map((item) => {
        return (
          <TodoCard key={item.id} todo={item} handleClickOpenDelete={handleOpenDelete}/>
        )
      })
    }

    // إذا كانت هناك مهام، اعرضها
    return todos.map((item) => {
      return (
        <TodoCard key={item.id} todo={item} handleClickOpenDelete={handleOpenDelete} />
      );
    });


  };

  // change Displayed Type
  function changeDisplayedType(event) {
    setDisplyedTodosType(event.target.value)
  }
  // ==== change Displayed Type ====

  return (
    <>
          {/* DELETE TODO MODAL */}
          <Dialog
            open={openDelete}
            onClose={handleCloseDelete}
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
              <Button onClick={handleCloseDelete} className="cancelDeleteBtn">إلغاء</Button>
              <Button onClick={handleDeleteConfirm} className="confirmDeleteBtn">
                تأكيد الحذف
              </Button>
            </DialogActions>
          </Dialog>
          {/* ==== DELETE TODO MODAL ==== */}

      {/* NAV BAR */}
      <div className="div-title">
        <h1>مهامي</h1>
        <hr />
      </div>
      <div className="flex">
        <ToggleButtonGroup
          value={displayedTodosType}
          exclusive
          onChange={changeDisplayedType}
          aria-label="text alignment"
        >
          <ToggleButton value="not-completed" className="toggleButtons">
            غير منجز
          </ToggleButton>

          <ToggleButton value="completed" className="toggleButtons">
            المنجز
          </ToggleButton>

          <ToggleButton value="all" className="toggleButtons">
            الكل
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      {/* ===== NAV BAR ===== */}

      {/* TODOS */}
      <div style={{ maxHeight: '60vh', overflow: 'scroll' }}>{renderTodos()}</div>
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
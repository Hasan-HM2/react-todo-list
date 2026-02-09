import "./App.css";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TodoList from "./components/TodoList";
import { useState } from "react"
import { TodosConetext } from "./context/todosContext";
import MySnackBar from "./components/MySnackBar";

import { ToastContext } from "./context/toastContext";

const theme = createTheme({
  typography: {
    fontFamily: "Tajwal",
    fontWeightRegular: "normal",
  },
});

function App() {
  const [todos, setTodos] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  function showHideToast(message) {
    setOpen(true)
    setMessage(message)
    setTimeout(() => {
      setOpen(false)
    }, 3000)
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <ToastContext.Provider value={{ showHideToast }}>
          <Container maxWidth="sm" className="container">
            <MySnackBar open={open} message={message} />
            <TodosConetext.Provider value={{ todos, setTodos }}>
              <TodoList />
            </TodosConetext.Provider>
          </Container>
        </ToastContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;

import "./App.css";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TodoList from "./components/TodoList";
import { useState } from "react"
import { TodosConetext } from "./context/todosContext";

import { ToastProvider } from "./context/toastContext";

const theme = createTheme({
  typography: {
    fontFamily: "Tajwal",
    fontWeightRegular: "normal",
  },
});

function App() {
  const [todos, setTodos] = useState([]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <ToastProvider>
          <Container maxWidth="sm" className="container">
            <TodosConetext.Provider value={{ todos, setTodos }}>
              <TodoList />
            </TodosConetext.Provider>
          </Container>
        </ToastProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;

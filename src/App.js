import "./App.css";
import Container from "@mui/material/Container";
import { Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TodoList from "./components/TodoList";
import { useState } from "react"
import { TodosConetext } from "./context/todosContext";
import { initTodos } from "./todosData";


const theme = createTheme({
  typography: {
    fontFamily: "Tajwal",
    fontWeightRegular: "normal",
  },
});

function App() {
  const [todos, setTodos] = useState(initTodos);
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Container maxWidth="sm" className="container">
          <TodosConetext.Provider value={{ todos, setTodos }}>
            <TodoList />
          </TodosConetext.Provider>
        </Container>
        <Routes>
          <Route path="" />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;

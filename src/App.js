import "./App.css";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TodoList from "./components/TodoList";
import { useState } from "react"
import { TodosConetext } from "./context/todosContext";


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
        <Container maxWidth="sm" className="container">
          <TodosConetext.Provider value={{ todos, setTodos }}>
            <TodoList />
          </TodosConetext.Provider>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;

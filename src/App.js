import "./App.css";
import Container from "@mui/material/Container";
import { Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TodoList from "./components/TodoList";

const theme = createTheme({
  typography: {
    fontFamily: "Tajwal",
    fontWeightRegular: "normal",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Container maxWidth="sm" className="container">
          <TodoList />
        </Container>
        <Routes>
          <Route path="" />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;

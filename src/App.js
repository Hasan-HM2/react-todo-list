import "./App.css";
import NavBar from "./components/NavBar";
import Container from "@mui/material/Container";
import AddTaskInput from "./components/AddTaskInput";
import TaskCard from "./components/TaskCard";
import { Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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
          <div>
            <nav>
              <NavBar />
            </nav>

            <div>
              <TaskCard />
            </div>

            <footer>
              <AddTaskInput />
            </footer>
          </div>
        </Container>
        <Routes>
          <Route path="" />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;

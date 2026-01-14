import "./App.css";
import NavBar from "./components/NavBar";
import Container from "@mui/material/Container";
import AddTaskInput from "./components/AddTaskInput";
import TaskCard from "./components/TaskCard";

function App() {
  return (
    <div className="App">
      <Container maxWidth="sm" className="container">
        <div>
          <nav>
            <NavBar />
          </nav>

          <div>
            <TaskCard title={"task title"} icons={"delete | edit | done"} />
          </div>

          <footer>
            <AddTaskInput />
          </footer>
        </div>
      </Container>
    </div>
  );
}

export default App;

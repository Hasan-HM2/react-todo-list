import "./App.css";
import NavBar from "./components/NavBar";
import Container from "@mui/material/Container";
import AddTaskInput from "./components/AddTaskInput"

function App() {
  return (
    <div className="App">
      <Container maxWidth="sm" className="container">
        <div>
          <nav>
            <NavBar />
          </nav>

          <footer>
            <AddTaskInput />
          </footer>
        </div>
      </Container>
    </div>
  );
}

export default App;

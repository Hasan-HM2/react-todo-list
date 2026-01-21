import "../styles/TodoCard.css";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import { useState } from "react";

const TodoCard = ({ title, details, isComplete }) => {
  const [completeStatus, setCompleteStatue] = useState(isComplete);
  return (
    <div className="task-card-container">
      <div className="one-card">
        <Grid container spacing={0}>
          <Grid
            size={4}
            display="flex"
            justifyContent="space-around"
            alignItems={"center"}
          >
            <IconButton
              className="iconButton"
              aria-label="delete"
              style={{
                color: "#78290f",
                background: "white",
                border: "solid #78290f 2px",
              }}
            >
              <DeleteIcon />
            </IconButton>

            <IconButton
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

            <IconButton
              onClick={() => {
                setCompleteStatue((prev) => !prev);
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
          </Grid>

          <Grid size={8} className="right">
            <h2
              style={{
                marginRight: "20px",
                marginBottom: "0px",
                fontSize: "28px",
              }}
            >
              {title}
            </h2>
            <h5
              style={{
                marginRight: "20px",
                marginTop: "1px",
                fontWeight: "normal",
              }}
            >
              {details}
            </h5>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default TodoCard;

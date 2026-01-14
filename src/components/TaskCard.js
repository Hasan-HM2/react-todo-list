import "../styles/TaskCard.css";

const TaskCard = ({ title, icons }) => {
  return (
    <div className="task-card-container">
      <div className="one-card">
        <div className="left">{icons}</div>
        <div className="right">
          <h2>{title}</h2>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;

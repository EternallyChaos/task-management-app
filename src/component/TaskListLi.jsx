import { Link } from "react-router-dom";
import { useTaskContext } from "./TaskContext";
import { FiPlay } from "react-icons/fi";

const TaskListLi = (props) => {
  const { dispatch } = useTaskContext();
  const taskID = props.id;
  const handleDeleteDispatch = (id) => {
    dispatch({
      type: "deleteTask",
      id: id,
    });
  };
  return (
    <li className="flex flex-row justify-between items-center border border-green-500 p-2 rounded">
      <div className="flex flex-row items-center gap-1">
        <Link to={`/timer`} state={taskID}>
          <FiPlay
            className="cursor-pointer"
            size={22}
            // onClick={() => console.log("a")}
          />
        </Link>
        <div className="flex gap-2">
          <span className={`${false ? "line-through" : ""}`}>
            Task: {props.taskName}
          </span>
          <span className={`${false ? "line-through" : ""}`}>
            Time Spent: {props.taskDuration}m
          </span>
        </div>
      </div>
      <button
        className="bg-gray-700 p-1.5 rounded"
        onClick={() => handleDeleteDispatch(props.id)}
      >
        Delete
      </button>
    </li>
  );
};

export default TaskListLi;

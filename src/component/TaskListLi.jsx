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
    <li className="flex flex-row gap-2 justify-between items-center border border-green-500 p-2 rounded">
      <div className="flex flex-row justify-between items-center gap-2">
        <Link to={`/timer`} state={taskID}>
          <FiPlay className="cursor-pointer" size={22} />
        </Link>
        <span className={`${false ? "line-through" : ""}`}>
          {props.taskName}
        </span>
        <span className={`${false ? "line-through" : ""}`}>
          Time: {props.taskDuration}m
        </span>
      </div>
      <button
        className="border border-green-500 py-0.5 px-1.5 rounded"
        onClick={() => handleDeleteDispatch(props.id)}
      >
        ✕
      </button>
    </li>
  );
};

export default TaskListLi;

import { FiPlay } from "react-icons/fi";
import { useState, useContext } from "react";
import { TaskListContext } from "../pages/MainPage";
import { Link } from "react-router-dom";
const TaskListBox = () => {
  const { taskList, setTaskList } = useContext(TaskListContext);

  const removeItem = (index) => {
    setTaskList(taskList.filter((_, i) => index !== i));
  };

  return (
    <div className="w-full rounded text-white flex flex-col gap-2">
      <h3 className="text-lg">Task List</h3>
      {taskList.slice(0, 3).map((taskItem, index) => {
        return (
          <div
            key={taskItem}
            className="flex flex-row justify-between items-center border border-green-500 p-2 rounded"
          >
            <div className="flex flex-row items-center gap-1">
              <Link to={`/timer`} state={{ task: taskItem }}>
                <FiPlay
                  className="cursor-pointer"
                  size={22}
                  onClick={() => console.log("a")}
                />
              </Link>
              <p className={`${false ? "line-through" : ""}`}>{taskItem}</p>
            </div>
            <button
              className="bg-gray-700 p-1.5 rounded"
              onClick={() => removeItem(index)}
            >
              Delete
            </button>
          </div>
        );
      })}
      {taskList.length > 3 ? (
        <div className="bg-red-500 p-3 rounded">
          Bro, atleast complete the first three tasks and then ask for more.
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default TaskListBox;

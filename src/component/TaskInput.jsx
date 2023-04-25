import { useState, useRef } from "react";
import { useTaskContext } from "./TaskContext";
import { v4 as uuidv4 } from "uuid";

function TaskInput() {
  const { dispatch } = useTaskContext();
  const [inputData, setInputData] = useState(null);
  const inputRef = useRef(null);

  const newTaskItem = {
    id: uuidv4(),
    taskName: inputData,
    taskDuration: 0,
  };

  const handleAddDispatch = () => {
    dispatch({
      type: "addTask",
      newTask: newTaskItem,
    });
  };

  const handleChange = (e) => {
    setInputData(e.target.value);
  };

  const handleSubmit = () => {
    {
      inputData && handleAddDispatch();
    }
    inputRef.current.value = null;
    setInputData(inputRef.current.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      {
        inputData && handleAddDispatch();
      }
      inputRef.current.value = null;
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-lg" htmlFor="">
        Input
      </label>
      <div className="">
        <input
          ref={inputRef}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="w-full mr-2 p-2 bg-transparent text-white py-2 px-4 border border-green-500 rounded text-lg focus:outline-none"
          type="text"
          placeholder="Type your task here"
        />
        <button
          onClick={handleSubmit}
          className="border border-green-500 hover:bg-green-500 py-2.5 px-3 rounded mt-2"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default TaskInput;

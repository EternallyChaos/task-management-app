import { useState, useContext, useRef, useEffect } from "react";
import { TaskListContext } from "../App";

function TaskInput() {
  const { taskList, setTaskList } = useContext(TaskListContext);
  const [inputData, setInputData] = useState(null);
  const inputRef = useRef(null);

  // taskList &&
  //   useEffect(() => {
  //     if (localStorage.getItem("taskList") !== null) {
  //       setTaskList(JSON.parse(window.localStorage.getItem("taskList")));
  //     } else {
  //       return;
  //     }
  //   }, []);

  // useEffect(() => {
  //   window.localStorage.setItem("taskList", taskList);
  // }, [taskList]);

  // console.log(window.localStorage.getItem("taskList"));

  const handleChange = (e) => {
    setInputData(e.target.value);
  };

  const handleSubmit = () => {
    {
      inputData && setTaskList([...taskList, inputData]);
    }
    inputRef.current.value = null;
    setInputData(inputRef.current.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      {
        inputData && setTaskList([...taskList, inputData]);
      }
      inputRef.current.value = null;
    }
  };

  return (
    <div>
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
    </div>
  );
}

export default TaskInput;

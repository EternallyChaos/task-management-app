import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";

import Timer from "./component/Timer";
import MainPage from "./pages/MainPage";

export const TaskListContext = createContext(null);

function App() {
  const [taskList, setTaskList] = useState([]);
  const [taskListDuration, setTaskListDuration] = useState([0, 0, 0]);

  return (
    <TaskListContext.Provider
      value={{
        taskList,
        setTaskList,
        taskListDuration,
        setTaskListDuration,
      }}
    >
      <BrowserRouter>
        <div className="App">
          <div className="font-poppins text-white">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/timer" element={<Timer />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </TaskListContext.Provider>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TaskContextProvider } from "./component/TaskContext";
import Timer from "./component/Timer";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <TaskContextProvider>
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
    </TaskContextProvider>
  );
}

export default App;

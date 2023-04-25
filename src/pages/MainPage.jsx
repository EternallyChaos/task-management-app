import { TaskContextProvider } from "../component/TaskContext";
import TaskListBox from "../component/TaskListBox";
import TaskInput from "../component/TaskInput";

const MainPage = () => {
  return (
    <div className="flex flex-col gap-3 my-2 px-4">
      <h2 className="text-green-400 text-2xl text-center">Task Manager</h2>
      <p>
        Type in your tasks first and then click on the "play-like" button to
        start the timer for that task. <br /> Tip: See what happens if you
        assign more then three tasks
      </p>
      <TaskInput />
      <TaskListBox />
    </div>
  );
};

export default MainPage;

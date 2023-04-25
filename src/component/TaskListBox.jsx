import { useTaskContext } from "./TaskContext";
import TaskListLi from "./TaskListLi";

const TaskListBox = () => {
  const { taskListObject } = useTaskContext();

  return (
    <div className="w-full rounded text-white flex flex-col gap-2">
      <h3 className="text-lg">Task List</h3>
      {taskListObject.map((taskItem, index) => {
        return (
          <TaskListLi
            key={index}
            taskName={taskItem.taskName}
            id={taskItem.id}
            taskDuration={taskItem.taskDuration}
          />
        );
      })}
      {taskListObject.length > 3 ? (
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

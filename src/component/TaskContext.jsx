import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";

const TaskContext = createContext();

export const TaskContextProvider = ({ children }) => {
  const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    });

    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
  };

  const [taskListObject, setTaskListObject] = useLocalStorage("taskList", [
    { id: 1, taskName: "Do that", taskDuration: "0" },
    { id: 2, taskName: "Make that", taskDuration: "0" },
    { id: 3, taskName: "See that", taskDuration: "0" },
  ]);

  const reducerMethod = (taskBook, action) => {
    switch (action.type) {
      case "addTask": {
        return {
          taskListObject: [...taskBook.taskListObject, action.newTask],
        };
      }
      case "updateTask": {
        return {
          taskListObject: taskBook.taskListObject.map((task) => {
            if (task.id == action.updatedTaskId) {
              return action.updatedTask;
            }
            return task;
          }),
        };
      }
      case "deleteTask": {
        return {
          taskListObject: taskBook.taskListObject.filter(
            (task) => task.id !== action.id
          ),
        };
      }
      default: {
        console.log("Something went wrong");
      }
    }
  };
  const [taskBook, dispatch] = useReducer(reducerMethod, { taskListObject });
  console.log(taskBook);
  useEffect(() => {
    setTaskListObject(taskBook.taskListObject);
  }, [taskBook.taskListObject]);

  return (
    <TaskContext.Provider
      value={{
        id: taskBook.id,
        taskListObject: taskBook.taskListObject,
        dispatch,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);

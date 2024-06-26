import { createContext, useReducer } from "react";

export const TaskContext = createContext();

export const TaskContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, { tasks: null });
  return (
    <TaskContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case "SET_TASK":
      return {
        tasks: action.payload,
      };
    case "CREATE_TASK":
      return {
        tasks: [action.payload, ...state.tasks],
      };
    case "DELETE_TASK":
      return {
        tasks: state.tasks?.filter(t => t._id !== action.payload._id),
      };
    default:
      return state;
  }
};

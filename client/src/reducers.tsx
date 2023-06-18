import { combineReducers } from "redux";

// Defines the initial state for the task form
const initialTaskFormState = {
  taskName: "",
  status: "Pending",
  comment: "",
  time: "",
};

// Defines the task form reducer
const taskFormReducer = (state = initialTaskFormState, action: any) => {
  switch (action.type) {
    case "UPDATE_TASK_FORM":
      return { ...state, ...action.payload };
    case "RESET_TASK_FORM":
      return initialTaskFormState;
    default:
      return state;
  }
};

// Combines all reducers into a root reducer
const rootReducer = combineReducers({
  taskForm: taskFormReducer,
});

export default rootReducer;

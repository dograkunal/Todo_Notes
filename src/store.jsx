import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./reduxExample/counterSlice";
import ToDoReducer from "./components/landingSlice";
export default configureStore({
  reducer: {
    counter: counterReducer,
    ToDoTask: ToDoReducer,
  },
});

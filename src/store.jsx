import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./reduxExample/counterSlice";
export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});

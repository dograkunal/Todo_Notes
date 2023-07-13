import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./reduxExample/counterSlice";
import ToDoReducer from "./components/landingSlice";
import LoginReducer from "./views/components/Authentication/login/loginSlice";
import RegisterReducer from "./views/components/Authentication/register/registerSlice";
export default configureStore({
  reducer: {
    counter: counterReducer,
    ToDoTask: ToDoReducer,
    Login: LoginReducer,
    Register: RegisterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

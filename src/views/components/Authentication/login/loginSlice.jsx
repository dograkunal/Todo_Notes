import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../../utils/instance";

export const loginAction = createAsyncThunk(
  "loginSlice/loginAction",
  async (loginDetails, thunkApi) => {
    try {
      const response = await axios.post("/auth/login", loginDetails);
      if (response && response.data && response.token) {
        localStorage.setItem("token", `Bearer ${response.token}`);
        response.data.token = `${response.token}`;
        thunkApi.dispatch(logInSuccess(response.data));
      }
    } catch (error) {
      thunkApi.dispatch(logInFailure(error));
      console.error("Login Failed");
    }
  }
);

export const LoginSlice = createSlice({
  name: "Login",
  initialState: {
    email: "xyz@abc.com",
    password: "123456",
  },
  reducers: {
    logInSuccess: (payload) => {
      return payload;
    },
    logInFailure: (err) => {
      return err;
    },
  },
});

export const { logInSuccess, logInFailure } = LoginSlice.actions;
export default LoginSlice.reducer;

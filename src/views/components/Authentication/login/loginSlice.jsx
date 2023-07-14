import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../../utils/instance";

export const loginAction = createAsyncThunk(
  "loginSlice/loginAction",
  async (loginDetails, thunkApi) => {
    // debugger;
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
    user: {},
    token: null,
    isloading: false,
  },
  reducers: {
    logInSuccess: (state, payload) => {
      // debugger;
      return {
        ...state,
        user: payload,
        token: payload.token,
        isloading: false,
      };
    },
    logInFailure: (state, err) => {
      console.log(err, "Login Failed");
      return {
        ...state,
        user: {},
        token: null,
        isLoading: false,
      };
    },
  },
});

export const { logInSuccess, logInFailure } = LoginSlice.actions;
export default LoginSlice.reducer;

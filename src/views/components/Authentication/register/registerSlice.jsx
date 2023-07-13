import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../../utils/instance";

export const registerAction = createAsyncThunk(
  "RegisterSlice/RegisterAction",
  async (RegisterDetails, thunkApi) => {
    try {
      const response = await axios.post("/auth/register", RegisterDetails);
      if (response && response.data && response.token) {
        localStorage.setItem("token", `Bearer ${response.token}`);
        response.data.token = `${response.token}`;
        thunkApi.dispatch(RegisterSuccess(response.data));
      }
    } catch (error) {
      thunkApi.dispatch(RegisterFailure(error));
      console.error("Login Failed");
    }
  }
);

const initialState = {
  user: {},
  token: null,
  isloading: false,
};

export const RegisterSlice = createSlice({
  name: "Register",
  initialState,
  reducers: {
    RegisterSuccess: (state, payload) => {
      return {
        ...state,
        user: payload.data,
        token: payload.token,
        isloading: false,
      };
    },
    RegisterFailure: (state, payload) => {
      return {
        ...state,
        isLoading: false,
        token: null,
        user: {},
      };
    },
  },
});

export const { RegisterSuccess, RegisterFailure } = RegisterSlice.actions;
export default RegisterSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/instance";

export const getTask = createAsyncThunk(
  "listSlice/listAction",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("/todo");
      if (response && response.data) {
        console.log(res, "Response from listslce");
        thunkApi.dispatch(getTaskSuccess(response.data));
      }
    } catch (error) {
      thunkApi.dispatch(getTaskFailure(error));
    }
  }
);

const initialState = {
  task: "",
  creater: "",
  isImmediate: false,
  tasksList: [],
};

const listSlice = createSlice({
  name: "TodoList",
  initialState,
  reducers: {
    getTaskSuccess: (state, payload) => {
      debugger;
      return {
        ...state,
        tasksList: payload,
      };
    },
    getTaskFailure: (state) => {
      return state;
    },
    addTaskSuccess: (state) => {
      return state;
    },
    removeTask: (state) => {
      return state;
    },
    updateTask: (state) => {
      return state;
    },
  },
});

export const {
  removeTask,
  updateTask,
  addTaskSuccess,
  getTaskSuccess,
  getTaskFailure,
} = listSlice.actions;
export default listSlice.reducer;

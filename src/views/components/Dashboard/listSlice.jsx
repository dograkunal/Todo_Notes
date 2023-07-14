import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/instance";

export const getTask = createAsyncThunk(
  "listSlice/Action/getTask",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("/todo");
      if (response && response.data) {
        // console.log(res, "Response from listslce");
        thunkApi.dispatch(getTaskSuccess(response.data));
      }
    } catch (error) {
      thunkApi.dispatch(getTaskFailure(error));
    }
  }
);

export const addTask = createAsyncThunk(
  "listSlice/Action/addTask",
  async (payload, thunkApi) => {
    try {
      // debugger;
      const res = await axios.post("/todo", payload);
      if (res && res.data) {
        thunkApi.dispatch(addTaskSuccess(res));
        thunkApi.dispatch(getTask());
      }
    } catch (error) {
      thunkApi.dispatch(addTaskFailure(error));
    }
  }
);

export const removeTask = createAsyncThunk(
  "listSlice/Action/removeTask",
  async (payload, thunkApi) => {
    try {
      // debugger;
      const res = await axios.delete(`/todo/${payload}`);
      if (res) {
        thunkApi.dispatch(getTask());
        thunkApi.dispatch(removeTaskSuccess());
      }
    } catch (error) {
      thunkApi.dispatch(removeTaskFailure(error));
    }
  }
);

export const editTask = createAsyncThunk(
  "listSlice/Action/removeTask",
  async (args, thunkApi) => {
    try {
      const res = await axios.put(`/todo/${args.id}`, args.data);
      if (res && res.data) {
        thunkApi.dispatch(updateTaskSuccess(res));
        thunkApi.dispatch(getTask());
      }
    } catch (error) {
      thunkApi.dispatch(updateTaskFailure(error));
    }
  }
);

export const getTaskData = createAsyncThunk(
  "listSlice/Action/removeTask",
  async (id, thunkApi) => {
    try {
      const res = await axios.get(`/todo/${id}`);
      if (res && res.data && res.data) {
        // debugger;
        thunkApi.dispatch(getTaskDataSuccess(res.data));
      }
    } catch (err) {
      thunkApi.dispatch(getTaskDataFailure(err));
    }
  }
);

const initialState = {
  task: "",
  creater: "",
  isImmediate: false,
  tasksList: [],
  taskDetails: null,
  updateList: false,
  updatedTask: false,
};

const listSlice = createSlice({
  name: "TodoList",
  initialState,
  reducers: {
    getTaskSuccess: (state, payload) => {
      // debugger;
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
    addTaskFailure: (state, payload) => {
      console.log(payload, "Add task Failure");
      return state;
    },
    removeTaskSuccess: (state) => {
      return state;
    },
    removeTaskFailure: (state, payload) => {
      console.log(payload, "Remove task Failure");
      return state;
    },
    updateTaskSuccess: (state) => {
      return {
        ...state,
        updatedTask: true,
      };
    },
    updateTaskFailure: (state, payload) => {
      console.log(payload, "Update task Failure");
      return {
        ...state,
        updatedTask: false,
      };
    },

    getTaskDataFailure: (state, payload) => {
      console.log(payload, "Task data get task Failure");
      return state;
    },

    getTaskDataSuccess: (state, payload) => {
      return {
        ...state,
        taskDetails: payload,
        updatedTask: false,
      };
    },
  },
});

export const {
  removeTaskSuccess,
  removeTaskFailure,
  updateTaskSuccess,
  updateTaskFailure,
  addTaskSuccess,
  addTaskFailure,
  getTaskSuccess,
  getTaskFailure,
  getTaskDataFailure,
  getTaskDataSuccess,
} = listSlice.actions;
export default listSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { task: "Buy milk", done: false },
  { task: "Have Whey", done: false },
];

export const ToDoSlice = createSlice({
  name: "ToDoTask",
  initialState,
  reducers: {
    addTask: (state, action) => {
      [
        console.log(...state, action.payload),

        {
          task: action.payload,
          done: false,
        },
      ];
    },
    deleteTask: (state, action) => ({
      ...state,
      task: state.task.filter((data) => data.id !== action.payload),
    }),
  },
});

export const { deleteTask, addTask } = ToDoSlice.actions;
export default ToDoSlice.reducer;

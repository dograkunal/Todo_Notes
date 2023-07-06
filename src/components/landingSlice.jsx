import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  notes: [
    { task: "Buy milk", done: false },
    { task: "Have Whey", done: false },
  ],
};

// Method 2
// const initialState = {
//   tasks: [],
// };

export const ToDoSlice = createSlice({
  name: "ToDoTask",
  initialState,
  reducers: {
    addTask: (state, action) => {
      // console.log(current(state.notes));
      // return [
      //   ...state.notes,
      //   {
      //     task: action.payload,
      //     done: false,
      //   },
      // ];

      return {
        ...state,
        notes: [
          ...state.notes,
          {
            task: action.payload,
            done: false,
          },
        ],
      };

      //Method 2
      // return {
      //   ...state,
      //   tasks: [...state.tasks, action.payload],
      // };
    },

    deleteTask: (state, action) => {
      console.log(current(state.notes), "Reducer");
      console.log(...state.notes.filter((data) => data !== action.payload));
      return {
        ...state,
        notes: [
          ...state.notes,
          {},
          // [action.field]: [...state.notes[action.field]].filter(
          //   (x, index) => index !== action.payload
          // ),
        ],
      };

      // Method 2
      // return {
      //   tasks: [...state.tasks.filter((data) => data !== action.payload)],
      // };
    },
  },
});

export const { deleteTask, addTask } = ToDoSlice.actions;
export default ToDoSlice.reducer;

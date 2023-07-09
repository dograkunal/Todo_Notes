import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  notes: [
    { id: 555, task: "Buy milk", done: false },
    { id: 444, task: "Have Whey", done: false },
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
      return {
        ...state,
        notes: [
          ...state.notes,
          {
            id: Math.floor(Math.random() * 1000),
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
      // console.log(current(state.notes), "Reducer");
      return {
        ...state,
        notes: [...state.notes.filter((item) => item.id !== action.payload)],
      };

      // Method 2
      // return {
      //   tasks: [...state.tasks.filter((data) => data !== action.payload)],
      // };
    },

    editTask: (state, action) => {
      // console.log(
      //   current(state.notes),
      //   action.payload.id,
      //   action.payload.value,
      //   "Edit Reducer"
      // );
      // debugger;
      // let newEditTodo = {
      //   ...state.notes.find((item) => item.id === action.payload.id),
      // };

      // if (newEditTodo) {
      //   return {
      //     ...state,
      //     notes: [ ...state.notes,{task: action.payload.value}],
      //   };
      // }
      const updatedNotes = state.notes.map((data) => {
        if (data.id === action.payload.id) {
          console.log(data.id === action.payload.id, "Edit");
          return { ...action.payload };
        }
        return data;
      });
      return {
        ...state,
        notes: updatedNotes
      }
    },
  },
});

export const { deleteTask, addTask, editTask } = ToDoSlice.actions;
export default ToDoSlice.reducer;

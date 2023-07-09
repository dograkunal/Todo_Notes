import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  notes: [
    { id: 555, task: "Buy milk", done: false },
    { id: 444, task: "Have Whey", done: false },
  ],
};

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
    },

    deleteTask: (state, action) => {
      return {
        ...state,
        notes: [...state.notes.filter((item) => item.id !== action.payload)],
      };
    },

    editTask: (state, action) => {
      const updatedNotes = state.notes.map((data) => {
        if (data.id === action.payload.id) {
          return { ...action.payload };
        }
        return data;
      });
      return {
        ...state,
        notes: updatedNotes,
      };
    },
  },
});

export const { deleteTask, addTask, editTask } = ToDoSlice.actions;
export default ToDoSlice.reducer;

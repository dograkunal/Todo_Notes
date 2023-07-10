import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  notes: [
    { id: 555, task: "Buy milk", done: false },
    { id: 444, task: "Have Whey", done: false },
  ],
  notesCopy: [
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
            id: action.payload.id,
            task: action.payload.task,
            done: false,
          },
        ],
        notesCopy: [...state.notes],
      };
    },

    deleteTask: (state, action) => {
      return {
        ...state,
        notes: [...state.notes.filter((item) => item.id !== action.payload)],
        notesCopy: [...state.notes],
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
        notesCopy: updatedNotes,
      };
    },

    searchTask: (state, action) => {
      if (action.payload.trim()) {
        return {
          ...state,
          notes: [
            ...state.notes.filter((item) =>
              item.task.toLowerCase().includes(action.payload.toLowerCase())
            ),
          ],
        };
      } else {
        return {
          ...state,
          notes: [...state.notesCopy],
        };
      }
    },
  },
});

export const { deleteTask, addTask, editTask, searchTask } = ToDoSlice.actions;
export default ToDoSlice.reducer;

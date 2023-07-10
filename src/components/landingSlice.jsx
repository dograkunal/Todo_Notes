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
      // console.log(current(notesCopy));
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
        notesCopy: [
          ...state.notes,
          {
            id: action.payload.id,
            task: action.payload.task,
            done: false,
          },
        ],
      };
    },

    deleteTask: (state, action) => {
      return {
        ...state,
        notes: [...state.notes.filter((item) => item.id !== action.payload)],
        notesCopy: [
          ...state.notes.filter((item) => item.id !== action.payload),
        ],
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
      console.log(current(state.notesCopy));
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

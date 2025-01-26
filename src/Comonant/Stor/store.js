import { configureStore } from "@reduxjs/toolkit";
import notesSlice from "../Slice/NotesSlice";

const store = configureStore({
  reducer: {
    notes: notesSlice,
  },
});

export default store;

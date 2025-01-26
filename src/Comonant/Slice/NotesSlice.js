import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import app from "../webPages/firebase";

const db = getFirestore(app);

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const querySnapshot = await getDocs(collection(db, "notes"));
  const notes = [];
  querySnapshot.forEach((doc) => {
    notes.push({ id: doc.id, ...doc.data() });
  });
  return notes;
});

export const addNote = createAsyncThunk("notes/addNote", async (note) => {
  const docRef = await addDoc(collection(db, "notes"), note);
  const doc = await docRef.get();
  return { id: doc.id, ...doc.data() };
});

export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (noteId) => {
    await deleteDoc(doc(db, "notes", noteId));
    return noteId;
  }
);

export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async ({ id, updates }) => {
    const noteRef = doc(db, "notes", id);
    await updateDoc(noteRef, updates);
    return { id, updates };
  }
);

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter((note) => note.id !== action.payload);
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const { id, updates } = action.payload;
        const existingNote = state.notes.find((note) => note.id === id);
        if (existingNote) {
          Object.assign(existingNote, updates);
        }
      });
  },
});

export default notesSlice.reducer;

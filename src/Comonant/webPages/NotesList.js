import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNotes, deleteNote, updateNote } from "../Slice/NotesSlice";
import "./NotesStyle.css";

const NotesList = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);
  const status = useSelector((state) => state.notes.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchNotes());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Failed to load notes.</p>;
  }

  const handleDelete = (noteId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (confirmed) {
      dispatch(deleteNote(noteId));
    }
  };

  const handleDone = (note) => {
    dispatch(updateNote({ id: note.id, updates: { done: !note.done } }));
  };

  return (
    <div className="notes-list">
      <h2 className="headerNotes">My Notes</h2>
      {notes.map((note) => (
        <div
          key={note.id}
          className="note"
          style={{
            backgroundColor: note.backgroundColor,
            fontFamily: note.font,
          }}
        >
          <h3 className="note-title">{note.title}</h3>
          <p className={`note-content ${note.done ? "line-through" : ""}`}>
            {note.content}
          </p>
          <span className="note-date">
            {note.created_at.toDate().toLocaleString()}
          </span>
          <button className="btn btn-primary" onClick={() => handleDone(note)}>
            {note.done ? "Undo" : "Done"}
          </button>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(note.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotesList;

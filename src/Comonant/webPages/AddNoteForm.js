import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNote } from "../Slice/NotesSlice";
import { SketchPicker } from "react-color";
import Select from "react-select";
import "./NotesStyle.css";

const fontOptions = [
  { value: "Arial", label: "Arial" },
  { value: "Courier New", label: "Courier New" },
  { value: "Georgia", label: "Georgia" },
  { value: "Times New Roman", label: "Times New Roman" },
  { value: "Verdana", label: "Verdana" },
];

const AddNoteForm = () => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [font, setFont] = useState(fontOptions[0]);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addNote({
        title,
        content,
        backgroundColor,
        font: font.value,
        created_at: new Date(),
      })
    );
    setTitle("");
    setContent("");
    setBackgroundColor("#ffffff");
    setFont(fontOptions[0]);
  };

  return (
    <div className="add-note-form-container">
      <h1 className="notesHeaders">Add notes</h1>
      <form onSubmit={handleSubmit} className="add-note-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="input-title"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="textarea-content"
        />
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setShowColorPicker(!showColorPicker)}
        >
          Background Color
        </button>
        {showColorPicker && (
          <SketchPicker
            color={backgroundColor}
            onChangeComplete={(color) => setBackgroundColor(color.hex)}
            className="color-picker"
          />
        )}
        <label>
          Font:
          <Select
            value={font}
            onChange={setFont}
            options={fontOptions}
            className="font-select"
          />
        </label>
        <button type="submit" className="submit-button">
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNoteForm;

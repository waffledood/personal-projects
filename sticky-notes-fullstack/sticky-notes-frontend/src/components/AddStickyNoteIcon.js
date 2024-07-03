import { useState } from "react";

import { getRandomColor } from "../utilities/randomColor";

import "./AddStickyNoteIcon.css";

function AddStickyNoteIcon({ stickyNotes, setStickyNotes }) {
  const [colorOfNextStickyNote, setColorOfNextStickyNote] = useState("yellow");

  const addStickyNoteHandler = () => {
    setColorOfNextStickyNote(getRandomColor());

    const newStickyNote = {
      id: Math.random() * 100 + 1,
      color: colorOfNextStickyNote,
      x_pixels_coord: 20,
      y_pixels_coord: 20,
    };

    setStickyNotes([...stickyNotes, newStickyNote]);
  };

  const onMouseDownHandler = () => {
    setColorOfNextStickyNote((currentColor) => {
      return `${currentColor}-dark`;
    });
  };

  const onMouseUpHandler = () => {
    setColorOfNextStickyNote((currentColor) => {
      return `${currentColor.replace("-dark", "")}`;
    });
  };

  return (
    <div id="add-sticky-note">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 30 448 448"
        onClick={addStickyNoteHandler}
        onMouseDown={onMouseDownHandler}
        onMouseUp={onMouseUpHandler}
      >
        <path
          id="add-sticky-note-path"
          className={colorOfNextStickyNote}
          d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H288V368c0-26.5 21.5-48 48-48H448V96c0-35.3-28.7-64-64-64H64zM448 352H402.7 336c-8.8 0-16 7.2-16 16v66.7V480l32-32 64-64 32-32z"
        />
      </svg>
    </div>
  );
}

export default AddStickyNoteIcon;

import { useState } from "react";

import "./AddStickyNoteIcon.css";

function AddStickyNoteIcon({ stickyNotes, addStickyNotes }) {
  const [colorOfNextStickyNote, setColorOfNextStickyNote] = useState("yellow");

  const addStickyNoteHandler = () => {
    // TODO - Remove hardcoded declaration of StickyNote
    const colors = ["yellow", "orange", "pink", "blue", "green"];

    setColorOfNextStickyNote(colors[Math.floor(Math.random() * colors.length)]);

    const newStickyNote = {
      id: Math.random() * 100 + 1,
      color: colorOfNextStickyNote,
      x: 20,
      y: 20,
    };

    addStickyNotes([...stickyNotes, newStickyNote]);
  };

  return (
    <div id="add-sticky-note">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 30 448 448"
        onClick={addStickyNoteHandler}
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

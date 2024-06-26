import React from "react";
import { useState } from "react";

import StickyNoteContainer from "./StickyNoteContainer";
import AddStickyNoteIcon from "./AddStickyNoteIcon";

function StickyNoteBoard() {
  const [stickyNotes, addStickyNotes] = useState([]);

  return (
    <React.Fragment>
      <StickyNoteContainer stickyNotes={stickyNotes} />
      <AddStickyNoteIcon
        stickyNotes={stickyNotes}
        addStickyNotes={addStickyNotes}
      />
    </React.Fragment>
  );
}

export default StickyNoteBoard;

import React from "react";

import StickyNote from "./StickyNote";

function StickyNoteContainer({ stickyNotes }) {
  console.log("stickyNotes:", stickyNotes);

  return (
    <React.Fragment>
      {stickyNotes.map(({ id, color, x, y }) => (
        <StickyNote key={id} id={id} color={color} x={x} y={y} />
      ))}
    </React.Fragment>
  );
}

export default StickyNoteContainer;

import React from "react";

import StickyNote from "./StickyNote";

function StickyNoteContainer({ stickyNotes }) {
  return (
    <React.Fragment>
      {stickyNotes.map(({ id, color, x_pixels_coord, y_pixels_coord }) => (
        <StickyNote
          key={id}
          id={id}
          color={color}
          x={x_pixels_coord}
          y={y_pixels_coord}
        ></StickyNote>
      ))}
    </React.Fragment>
  );
}

export default StickyNoteContainer;

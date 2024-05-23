import { useState } from "react";

import "./StickyNote.css";

function StickyNote({ id, color, xCoord, yCoord, children }) {
  const [x, setX] = useState(xCoord);
  const [y, setY] = useState(yCoord);

  return (
    <div
      id={`sticky-note-${id}`}
      data-id={`${id}`}
      className={`sticky-note ${color}`}
      style={{
        top: y,
        left: x,
      }}
    >
      <div
        id={`sticky-note-${id}-header`}
        className={`sticky-note-header ${color}-header`}
      ></div>
      <textarea
        name=""
        id={`sticky-note-${id}-text`}
        className={`${color}`}
        cols=""
        rows=""
      >
        {children}
      </textarea>
    </div>
  );
}

export default StickyNote;

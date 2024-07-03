import "./StickyNote.css";

import useDrag from "../hooks/useDrag";

function StickyNote({ id, color, text, x, y }) {
  const startingPosition = { startingXCoord: x, startingYCoord: y };

  const { picturePosition, handleMouseDown, handleMouseMove, handleMouseUp } =
    useDrag(startingPosition);

  return (
    <div
      id={`sticky-note-${id}`}
      data-id={`${id}`}
      className={`sticky-note ${color}`}
      style={{
        ...picturePosition,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        id={`sticky-note-${id}-header`}
        className={`sticky-note-header ${color}-header`}
      ></div>
      <textarea
        name=""
        id={`sticky-note-${id}-text`}
        value={text}
        className={`${color}`}
        cols=""
        rows=""
      ></textarea>
    </div>
  );
}

export default StickyNote;

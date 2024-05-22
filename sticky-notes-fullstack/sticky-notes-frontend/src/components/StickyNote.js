import "./StickyNote.css";

function StickyNote({ id, color, children }) {
  return (
    <div
      id={`sticky-note-${id}`}
      data-id={`${id}`}
      className={`sticky-note ${color}`}
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

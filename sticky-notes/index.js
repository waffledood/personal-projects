const maxNumberOfStickyNotes = 5;

document.addEventListener("DOMContentLoaded", function () {
  const addStickyNoteIconDiv = document.getElementById("add-sticky-note");
  addStickyNoteIconDiv.addEventListener("click", addStickyNoteIconClickHandler);
});

function createStickyNote() {
  const number = 1;

  const stickyNoteTemplate = `
    <div id="sticky-note-${number}" class="sticky-note">
      <div id="sticky-note-${number}-header" class="sticky-note-header"></div>
      <textarea name="" id="" cols="" rows=""></textarea>
    </div>
  `;

  const parser = new DOMParser();
  const doc = parser.parseFromString(stickyNoteTemplate, "text/html");

  const stickyNote = doc.body.firstChild;

  return stickyNote;
}

function makeElementDraggable(element) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  document.getElementById(element.id + "-header").onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    element.style.top = element.offsetTop - pos2 + "px";
    element.style.left = element.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function addStickyNoteIconClickHandler(event) {
  // Create a new sticky note when the add-sticky-note div is clicked
  const newStickyNote = createStickyNote();
  document.getElementById("sticky-notes-container").append(newStickyNote);
  makeElementDraggable(newStickyNote);
}

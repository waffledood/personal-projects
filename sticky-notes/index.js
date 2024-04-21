const maxNumberOfStickyNotes = 5;
const stickyNoteColors = ["yellow", "orange", "pink", "blue", "green"];

const allIds = Array.from(Array(maxNumberOfStickyNotes).keys());
const availableIds = Array.from(Array(maxNumberOfStickyNotes).keys());

document.addEventListener("DOMContentLoaded", function () {
  const addStickyNoteIconDiv = document.getElementById("add-sticky-note");
  addStickyNoteIconDiv.addEventListener(
    "mousedown",
    changeStickyNoteSVGIconColor
  );
  addStickyNoteIconDiv.addEventListener("click", addStickyNoteIconClickHandler);
});

function createStickyNote() {
  // Select id for new sticky note, from pool of available id's
  const number = availableIds[Math.floor(Math.random() * availableIds.length)];

  console.log("Number selected:", number);

  const addStickyNotePath = document.getElementById("add-sticky-note-path");
  const colorOfNextStickyNote = Array.from(addStickyNotePath.classList)[0];

  const randomColor =
    stickyNoteColors[Math.floor(Math.random() * stickyNoteColors.length)];

  addStickyNotePath.classList.remove(colorOfNextStickyNote);
  addStickyNotePath.classList.add(randomColor);

  const color = colorOfNextStickyNote || randomColor;

  // Create new sticky note
  const stickyNoteTemplate = `
    <div id="sticky-note-${number}" data-id="${number}" class="sticky-note ${color}">
      <div id="sticky-note-${number}-header" class="sticky-note-header ${color}-header"></div>
      <textarea name="" id="sticky-note-${number}-text" class="${color}" cols="" rows=""></textarea>
    </div>
  `;

  const parser = new DOMParser();
  const doc = parser.parseFromString(stickyNoteTemplate, "text/html");

  const stickyNote = doc.body.firstChild;

  // Add sticky note to HTML doc
  document.getElementById("sticky-notes-container").append(stickyNote);

  makeElementDraggable(stickyNote);

  updateAvailableIds();
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

function updateAvailableIds() {
  const activeStickyNotes = document.getElementsByClassName("sticky-note");

  for (let i = 0; i < activeStickyNotes.length; i++) {
    const element = activeStickyNotes[i];
    const indexOfActiveId = availableIds.indexOf(Number(element.dataset.id));

    if (indexOfActiveId > -1) {
      availableIds.splice(indexOfActiveId, 1);
    }
  }
}

function addStickyNoteIconClickHandler(event) {
  const addStickyNoteIconDiv = event.currentTarget;

  const addStickNoteIcon = document.getElementById("add-sticky-note-path");

  // Create a new sticky note when the add-sticky-note div is clicked
  if (availableIds.length != 0) {
    createStickyNote();
  }
}

function changeStickyNoteSVGIconColor() {
  const addStickyNotePath = document.getElementById("add-sticky-note-path");
  const colorOfNextStickyNote = Array.from(addStickyNotePath.classList)[0];

  // Get the root element
  const root = document.documentElement;

  // Set the value of the CSS variable
  root.style.setProperty(
    "--color-active-svg",
    `var(--color-${colorOfNextStickyNote}-dark)`
  );
}

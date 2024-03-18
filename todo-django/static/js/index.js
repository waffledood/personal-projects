let successToast;
let errorToast;

document.addEventListener("DOMContentLoaded", function () {
  initializeBootstrapToasts();
  todoItemFormSetup();
  markTodoItemAsCompleted();
  deleteTodoItem();
});

function initializeBootstrapToasts() {
  const toastElList = document.querySelectorAll(".toast");
  const toastList = [...toastElList].map(
    (toastEl) => new bootstrap.Toast(toastEl)
  );
}

function showErrorToast(message) {
  const errorToastHTMLElement = document.getElementById("errorToast");

  const errorToastBody = document.getElementById("errorToast-body");
  errorToastBody.innerHTML = message;

  errorToast = bootstrap.Toast.getOrCreateInstance(errorToastHTMLElement);
  errorToast.show();
}

function showSuccessToast(message) {
  const successToastHTMLElement = document.getElementById("successToast");

  const successToastBody = document.getElementById("successToast-body");
  successToastBody.innerHTML = message;

  successToast = bootstrap.Toast.getOrCreateInstance(successToastHTMLElement);
  successToast.show();
}

function todoItemTemplate(todoItem) {
  return `
    <div id="todoitem-${todoItem.id}" class="d-flex flex-row align-items-center justify-content-between p-3 rounded-3 todoItem">
      <div class="d-flex flex-row align-items-center">
        <input type="checkbox" name="todoitem-checkbox-${todoItem.id}" id="todoitem-checkbox-${todoItem.id}" data-todoitem-id="${todoItem.id}"/>
        <div class="ms-3">${todoItem.detail}</div>
      </div>
      <button id="todoitem-delete-${todoItem.id}" class="deleteTodoItemButton" type="button" data-todoitem-id="${todoItem.id}" >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
        </svg>
      </button>
    </div>
  `;
}

function handleInputCheckboxClickEvent(event, inputCheckbox) {
  const todoitemId = inputCheckbox.dataset.todoitemId;

  const payload = {
    completed: inputCheckbox.checked == true,
  };

  const postUrl = `http://localhost:8000/todo/updateTodoItemCompleteStatus/${todoitemId}/`;

  fetch(postUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }
      return response.json();
    })
    .then((jsonResponse) => {
      console.log("jsonResponse:", jsonResponse);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

function createTodoItemFromHTML(htmlString, elementId) {
  // Create a new DOMParser
  const parser = new DOMParser();

  // Parse the HTML string
  const parsedDocument = parser.parseFromString(htmlString, "text/html");

  // add event listener to checkbox
  const todoItemCheckboxId = `todoitem-checkbox-${elementId}`;
  const todoItemCheckbox = parsedDocument.getElementById(todoItemCheckboxId);
  todoItemCheckbox.addEventListener("click", (event) => {
    handleInputCheckboxClickEvent(event, todoItemCheckbox);
  });

  const todoItemId = `todoitem-${elementId}`;

  return parsedDocument.getElementById(todoItemId);
}

function todoItemFormSetup() {
  "use strict";

  const todoItemForm = document.querySelector("#addTodoItemForm");

  todoItemForm.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();
      event.stopPropagation();

      todoItemForm.classList.add("was-validated");

      // only submit the POST request if the form is valid
      if (todoItemForm.checkValidity()) {
        const todoItemDetailInput = document.querySelector("#todoItemDetail");
        const todoItemDetailString = todoItemDetailInput.value.trim();

        const payload = {
          detail: todoItemDetailString,
        };

        fetch("http://localhost:8000/todo/addTodoItem/", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Server returned ${response.status}`);
            }
            return response.json();
          })
          .then((jsonResponse) => {
            const newTodoItem = jsonResponse["todoItem"];

            console.log("newTodoItem:", newTodoItem);

            const listWrapper = document.querySelector("#listWrapper");

            const newTodoItemHTML = createTodoItemFromHTML(
              todoItemTemplate(newTodoItem),
              newTodoItem.id
            );

            listWrapper.appendChild(newTodoItemHTML);

            // Scroll new To-Do Item into view
            newTodoItemHTML.scrollIntoView({ behavior: "smooth" });

            // Close the Add To-Do Item modal
            const addTodoItemModal =
              document.querySelector("#addTodoItemModal");
            const addTodoItemBootstrapModal =
              bootstrap.Modal.getInstance(addTodoItemModal);
            addTodoItemBootstrapModal.hide();

            // Clear fields of form
            todoItemDetailInput.value = "";

            // Remove "was-validated" class
            todoItemForm.classList.remove("was-validated");

            // Display success toast
            showSuccessToast(`TodoItem has been successfully added.`);
          })
          .catch((error) => {
            console.error(
              "There was a problem with the fetch operation:",
              error
            );

            // Display error toast
            showErrorToast("There was a problem adding the TodoItem.");
          });
      }
    },
    false
  );
}

function markTodoItemAsCompleted() {
  const allInputs = document.getElementsByTagName("input");

  for (var i = 0, max = allInputs.length; i < max; i++) {
    if (allInputs[i].type === "checkbox") {
      const inputCheckbox = allInputs[i];

      inputCheckbox.addEventListener(
        "click",
        (event) => {
          handleInputCheckboxClickEvent(event, inputCheckbox);
        },
        false
      );
    }
  }
}

function deleteTodoItem() {
  const allDeleteButtons = document.getElementsByClassName(
    "deleteTodoItemButton"
  );

  Array.from(allDeleteButtons).forEach((deleteButton) => {
    deleteButton.addEventListener(
      "click",
      (event) => {
        const todoItemId = deleteButton.dataset.todoitemId;

        const payload = {
          todoItemToDeleteId: todoItemId,
        };

        fetch("http://localhost:8000/todo/deleteTodoItem/", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Server returned ${response.status}`);
            }
            return response.json();
          })
          .then((jsonResponse) => {
            const todoItemToDeleteHTML = document.getElementById(
              `todoitem-${todoItemId}`
            );

            todoItemToDeleteHTML.remove();

            // Display success toast
            showSuccessToast(`TodoItem has been successfully removed.`);
          })
          .catch((error) => {
            console.error(
              "There was a problem with the fetch operation:",
              error
            );

            // Display error toast
            showErrorToast("There was a problem removing the TodoItem.");
          });
      },
      false
    );
  });
}
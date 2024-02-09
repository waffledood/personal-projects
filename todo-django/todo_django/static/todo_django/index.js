function todoItemTemplate(todoItem) {
  return `
    <div id="todoitem-${todoItem.id}" class="d-flex flex-row align-items-center p-3 rounded-3 todoItem">
      <input type="checkbox" name="todoitem-checkbox-${todoItem.id}" id="todoitem-checkbox-${todoItem.id}" />
      <div class="ms-3">${todoItem.detail}</div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", function () {
  todoItemFormSetup();
});

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

        fetch("http://localhost:8000/todo/addTodoItem", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })
          .then((response) => {
            return response.json();
          })
          .then((jsonResponse) => {
            const newTodoItem = jsonResponse["todoItem"];

            console.log("newTodoItem:", newTodoItem);

            const listWrapper = document.querySelector("#listWrapper");

            const newTodoItemHTML = todoItemTemplate(newTodoItem);

            listWrapper.innerHTML += newTodoItemHTML;

            // Scroll new To-Do Item into view
            const newTodoItemAdded = document.getElementById(
              `todoitem-${newTodoItem.id}`
            );
            newTodoItemAdded.scrollIntoView({ behavior: "smooth" });

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
          });
      }
    },
    false
  );
}

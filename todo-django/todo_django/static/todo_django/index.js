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

      const todoItemDetailInput = document.querySelector("#todoItemDetail");
      const todoItemDetailString = todoItemDetailInput.value.trim();

      const payload = {
        todoItemDetail: todoItemDetailString,
      };

      // only submit the POST request if the form is valid
      if (todoItemForm.checkValidity()) {
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
            // TODO - add newly created To-Do Item to current list

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

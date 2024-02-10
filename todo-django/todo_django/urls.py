from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("addTodoItem", views.addTodoItem, name="addTodoItem"),
    path(
        "updateTodoItemCompleteStatus/<int:todoItemId>",
        views.updateTodoItemCompleteStatus,
        name="updateTodoItemCompleteStatus",
    ),
]

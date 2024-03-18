import json
from django.db import Error

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from .forms import TodoItemForm, TodoItemCompletedForm
from .models import TodoItem


def index(request):
    # Retrieve all TodoItem objects
    allTodoItemObjects = list(TodoItem.objects.all())

    return render(
        request=request,
        template_name="index.html",
        context={"allTodoItemObjects": allTodoItemObjects},
    )


@csrf_exempt
def addTodoItem(request):
    if request.method != "POST":
        return JsonResponse(
            data={"message": "Only POST requests are allowed."}, status=400
        )

    try:
        jsonPostData = json.loads(request.body)

        form = TodoItemForm(data=jsonPostData)
        new_TodoItem = form.save()

        print("new_TodoItem saved:", new_TodoItem)

        return JsonResponse(
            data={
                "message": "To-Do Item successfully added.",
                "todoItem": new_TodoItem.serialize(),
            },
            status=200,
        )
    except ValueError:
        print("Error during form validation")

        return JsonResponse(
            data={"message": "Error during form validation."}, status=400
        )


@csrf_exempt
def updateTodoItemCompleteStatus(request, todoItemId):
    if request.method != "POST":
        return JsonResponse(
            data={"message": "Only POST requests are allowed."}, status=400
        )

    try:
        jsonPostData = json.loads(request.body)

        todoItemToUpdate = TodoItem.objects.get(pk=todoItemId)

        form = TodoItemCompletedForm(data=jsonPostData, instance=todoItemToUpdate)
        updatedTodoItem = form.save()

        print("updatedTodoItem saved:", updatedTodoItem)

        return JsonResponse(
            data={
                "message": "To-Do Item's completed status successfully updated.",
                "todoItem": updatedTodoItem.serialize(),
            },
            status=200,
        )
    except ValueError:
        print("Error during form validation")

        return JsonResponse(
            data={"message": "Error during form validation."}, status=400
        )


@csrf_exempt
def deleteTodoItem(request):
    if request.method != "POST":
        return JsonResponse(
            data={"message": "Only POST requests are allowed."}, status=400
        )

    try:
        jsonPostData = json.loads(request.body)

        todoItemToDeleteId = jsonPostData["todoItemToDeleteId"]
        todoItemToDelete = TodoItem.objects.get(pk=todoItemToDeleteId)

        deleteMessageTuple = todoItemToDelete.delete()

        return JsonResponse(
            data={
                "message": "To-Do Item successfully deleted.",
                "todoItem": todoItemToDelete.serialize(),
            },
            status=200,
        )
    except TodoItem.DoesNotExist:
        print("TodoItem with that id does not exist.")

        return JsonResponse(
            data={"message": "TodoItem with that id does not exist."}, status=400
        )

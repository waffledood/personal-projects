import json

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from .forms import TodoItemForm
from .models import TodoItem


def index(request):
    # Retrieve all TodoItem objects
    allTodoItemObjects = list(TodoItem.objects.all())

    return render(
        request=request,
        template_name="todo_django/index.html",
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

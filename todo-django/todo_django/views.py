from django.http import HttpResponse
from django.shortcuts import render

from .models import TodoItem


def index(request):
    # Retrieve all TodoItem objects
    allTodoItemObjects = list(TodoItem.objects.all())

    return render(
        request=request,
        template_name="todo_django/index.html",
        context={"allTodoItemObjects": allTodoItemObjects},
    )

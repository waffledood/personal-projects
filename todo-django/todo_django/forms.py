from django.forms import ModelForm

from .models import TodoItem


class TodoItemForm(ModelForm):
    class Meta:
        model = TodoItem
        fields = ["detail", "completed"]


class TodoItemCompletedForm(ModelForm):
    class Meta:
        model = TodoItem
        fields = ["completed"]

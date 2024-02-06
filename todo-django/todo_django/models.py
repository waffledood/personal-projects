from django.db import models


class TodoItem(models.Model):
    detail = models.CharField(max_length=128)
    completed = models.BooleanField(default=False)

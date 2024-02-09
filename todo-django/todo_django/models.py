from django.db import models


class TodoItem(models.Model):
    detail = models.CharField(max_length=128)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return f"[{'X' if self.completed else ' '}] Task ({self.id}): {self.detail}"

    def serialize(self):
        return {"id": self.id, "detail": self.detail, "completed": self.completed}

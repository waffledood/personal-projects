from django.db import models
from django.contrib.auth.models import User


class Note(models.Model):
    YELLOW = "yellow"
    ORANGE = "orange"
    PINK = "pink"
    BLUE = "blue"
    GREEN = "green"
    COLOR_CHOICES = {
        YELLOW: "yellow",
        ORANGE: "orange",
        PINK: "pink",
        BLUE: "blue",
        GREEN: "green",
    }

    text = models.CharField(max_length=128)
    author = models.ForeignKey(to=User, on_delete=models.CASCADE)
    color = models.CharField(max_length=15, choices=COLOR_CHOICES, default=YELLOW)
    x_pixels_coord = models.IntegerField()
    y_pixels_coord = models.IntegerField()

    def __str__(self):
        return f"Note ({self.id}) ({self.color}) [{self.x_pixels_coord}px, {self.y_pixels_coord}px]: {self.text}"

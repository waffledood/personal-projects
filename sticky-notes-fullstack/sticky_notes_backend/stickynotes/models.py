from django.db import models


class Note(models.Model):
    text = models.CharField(max_length=128)
    x_pixels_coord = models.IntegerField()
    y_pixels_coord = models.IntegerField()

    def __str__(self):
        return f"Note ({self.id}) [{self.x_pixels_coord}px, {self.y_pixels_coord}px]: {self.text}"

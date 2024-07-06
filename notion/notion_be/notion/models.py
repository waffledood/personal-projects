from django.db import models
from django.contrib.auth.models import User


class Page(models.Model):
    title = models.CharField(max_length=128)
    author = models.ForeignKey(to=User, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now=True)
    saved = models.DateTimeField(auto_now_add=True)


class Block(models.Model):
    BLOCK_TYPE_CHOICES = [
        ("nn", "Empty"),
        ("h1", "Heading 1"),
        ("h2", "Heading 2"),
        ("h3", "Heading 3"),
        ("tx", "Text"),
    ]

    page = models.ForeignKey(to=Page, on_delete=models.CASCADE)
    page_order = models.PositiveIntegerField()
    type = models.CharField(max_length=2, choices=BLOCK_TYPE_CHOICES, default="nn")

    content = models.CharField()

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["page", "page_order"], name="unique_block_order_per_page"
            )
        ]

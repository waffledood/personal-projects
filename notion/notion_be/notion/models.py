from django.db import models
from django.contrib.auth.models import User


class Page(models.Model):
    title = models.CharField(max_length=128, default="Untitled")
    author = models.ForeignKey(to=User, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now=True)
    saved = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Page ({self.id}): {self.title} created at {self.created}, last saved at {self.saved}"


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
    author = models.ForeignKey(to=User, on_delete=models.CASCADE)

    content = models.TextField(blank=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["page", "page_order"], name="unique_block_order_per_page"
            )
        ]

    def __str__(self):
        return f"Block ({self.id}) - Page: ({self.page.id}, {self.page_order}) [Type: {self.type}]: {self.content[:20]}"

from django.urls import path

from .views import ListBlock, DetailBlock

urlpatterns = [
    path(route="blocks/", view=ListBlock.as_view(), name="block_list"),
    path(route="block/<int:pk>/", view=DetailBlock.as_view(), name="block_detail"),
]

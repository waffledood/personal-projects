from django.urls import path

from .views import ListNote, DetailNote, ListAuthor

urlpatterns = [
    path(route="notes/", view=ListNote.as_view(), name="note_list"),
    path(route="notes/<int:pk>/", view=DetailNote.as_view(), name="note_detail"),
    path(route="author/", view=ListAuthor.as_view(), name="author_detail"),
]

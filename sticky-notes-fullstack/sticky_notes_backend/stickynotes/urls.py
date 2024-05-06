from django.urls import path

from .views import ListNote, DetailNote, listAuthorNotes, DetailAuthor

urlpatterns = [
    path(route="notes/", view=ListNote.as_view(), name="note_list"),
    path(route="note/<int:pk>/", view=DetailNote.as_view(), name="note_detail"),
    path(
        route="author/<int:pk>/notes/", view=listAuthorNotes, name="author_notes_list"
    ),
    path(route="author/<int:pk>/", view=DetailAuthor.as_view(), name="author_detail"),
]

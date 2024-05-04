from django.urls import path

from .views import ListNote, DetailNote

urlpatterns = [
    path(route="notes/", view=ListNote.as_view(), name="note_list"),
    path(route="note/<int:pk>/", view=DetailNote.as_view(), name="note_detail"),
]

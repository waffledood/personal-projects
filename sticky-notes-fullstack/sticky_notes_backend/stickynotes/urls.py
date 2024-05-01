from django.urls import path

from .views import NoteAPIView, DetailNote

urlpatterns = [
    path(route="notes/", view=NoteAPIView.as_view(), name="note_list"),
    path(route="note/<int:pk>/", view=DetailNote.as_view(), name="note_detail"),
]

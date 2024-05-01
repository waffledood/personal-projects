from django.urls import path

from .views import NoteAPIView

urlpatterns = [path(route="notes/", view=NoteAPIView.as_view(), name="notes")]

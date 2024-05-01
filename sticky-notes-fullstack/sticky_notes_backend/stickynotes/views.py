from rest_framework import generics

from django.http import HttpResponse
from django.shortcuts import render

from .models import Note
from .serializers import NoteSerializer


class ListNote(generics.ListAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer


class DetailNote(generics.RetrieveAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

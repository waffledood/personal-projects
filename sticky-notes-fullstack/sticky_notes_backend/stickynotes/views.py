from rest_framework import generics

from django.http import HttpResponse
from django.shortcuts import render

from .models import Note
from .serializers import NoteSerializer


class ListNote(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer


class DetailNote(generics.RetrieveUpdateDestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

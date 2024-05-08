from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import JSONParser
from rest_framework.response import Response

from django.contrib.auth.models import User

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render

from .models import Note
from .permissions import IsAuthorOrReadOnly, IsUserOrReadOnly
from .serializers import NoteSerializer, UserSerializer


class ListNote(generics.ListCreateAPIView):
    permission_classes = (IsAuthorOrReadOnly,)
    queryset = Note.objects.all()
    serializer_class = NoteSerializer


class DetailNote(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthorOrReadOnly,)
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def perform_update(self, serializer):
        serializer.save(author=self.request.user)


class ListAuthor(generics.ListCreateAPIView):
    permission_classes = (IsUserOrReadOnly,)
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)

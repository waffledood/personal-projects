from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.response import Response

from django.contrib.auth.models import User

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render

from .models import Note
from .serializers import NoteSerializer


class ListNote(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer


class DetailNote(generics.RetrieveUpdateDestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer


@api_view(["GET", "POST"])
def listAuthorNotes(request, pk):
    try:
        author = User.objects.get(id=pk)
    except User.DoesNotExist:
        return Response(
            {"detail": "No such User exists"}, status=status.HTTP_404_NOT_FOUND
        )
    except User.MultipleObjectsReturned:
        return Response(
            {"detail": "Multiple Users with the same id exists"},
            status=status.HTTP_404_NOT_FOUND,
        )

    if request.method == "GET":
        notes = Note.objects.filter(author=author)
        serializer = NoteSerializer(notes, many=True)
        return JsonResponse(serializer.data, safe=False)

    if request.method == "POST":
        data = JSONParser().parse(request)
        serializer = NoteSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


class DetailAuthor(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = NoteSerializer

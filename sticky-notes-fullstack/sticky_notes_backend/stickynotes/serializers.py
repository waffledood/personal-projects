from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Note


class NoteSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source="author.username")

    class Meta:
        model = Note
        fields = ("id", "text", "author", "color", "x_pixels_coord", "y_pixels_coord")


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username")

from rest_framework import serializers

from .models import Block, Page


class BlockSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source="author.username")

    class Meta:
        model = Block
        fields = ("id", "page", "page_order", "type", "author", "content")


class PageSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source="author.username")

    class Meta:
        model = Page
        fields = ("id", "title", "author", "created", "saved")

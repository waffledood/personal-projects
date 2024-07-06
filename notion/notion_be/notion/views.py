from rest_framework import generics

from .models import Block, Page
from .permissions import IsAuthorOrReadOnly
from .serializers import BlockSerializer, PageSerializer


class ListBlock(generics.ListCreateAPIView):
    permission_classes = (IsAuthorOrReadOnly,)
    serializer_class = BlockSerializer

    def get_queryset(self):
        return Block.objects.filter(author=self.request.user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class DetailBlock(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthorOrReadOnly,)
    queryset = Block.objects.all()
    serializer_class = BlockSerializer

    def perform_update(self, serializer):
        serializer.save(author=self.request.user)


class ListPage(generics.ListCreateAPIView):
    permission_classes = (IsAuthorOrReadOnly,)
    serializer_class = PageSerializer

    def get_queryset(self):
        return Page.objects.filter(author=self.request.user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class DetailPage(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthorOrReadOnly,)
    queryset = Page.objects.all()
    serializer_class = PageSerializer

    def perform_update(self, serializer):
        serializer.save(author=self.request.user)

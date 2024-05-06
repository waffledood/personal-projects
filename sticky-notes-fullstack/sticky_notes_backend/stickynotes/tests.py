from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


from .models import Note


class APITests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.author = User.objects.create(
            username="testuser", password="samplepassword123"
        )

        cls.note = Note.objects.create(
            text="This is my 1st sticky note",
            author=cls.author,
            x_pixels_coord=120,
            y_pixels_coord=200,
        )

    def test_api_notelistview(self):
        response = self.client.get(reverse("note_list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, self.note.text)

    def test_api_notedetailview(self):
        response = self.client.get(
            reverse("note_detail", kwargs={"pk": self.note.id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, self.note.text)

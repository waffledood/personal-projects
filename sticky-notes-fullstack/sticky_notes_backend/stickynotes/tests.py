from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


from .models import Note


class APITests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.note = Note.objects.create(
            text="This is my 1st sticky note", x_pixels_coord=120, y_pixels_coord=200
        )

    def test_api_listview(self):
        response = self.client.get(reverse("note_list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, self.note.text)

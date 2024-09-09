from django.urls import path

from . import views

urlpatterns = [path("weather/<str:location>", views.weather, name="weather")]

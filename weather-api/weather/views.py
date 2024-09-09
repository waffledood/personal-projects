from django.http import HttpResponse
from django.shortcuts import render


def weather(request, location):
    return HttpResponse("Hello world!")

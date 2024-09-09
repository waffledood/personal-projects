import json
import requests

from django.http import JsonResponse, HttpResponse
from django.shortcuts import render

from environs import Env
from pathlib import Path

env = Env()
env.read_env()


def weather(request, location):
    return HttpResponse("Hello world!")

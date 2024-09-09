import json
import requests

from django.http import JsonResponse, HttpResponse
from django.shortcuts import render

from environs import Env
from pathlib import Path

env = Env()
env.read_env()


def weather(request, location):
    apiKey = env.str("VISUAL_CROSSING_API_KEY")
    response = requests.request(
        "GET",
        f"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/{location}?unitGroup=metric&key={apiKey}&contentType=json",
    )

    if response.status_code != 200:
        return JsonResponse({"message": "Error retrieving request"}, status=400)

    # Parse the results as JSON
    jsonData = response.json()

    return JsonResponse(jsonData)

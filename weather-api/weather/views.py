import datetime
import json
import redis
import requests

from django.http import JsonResponse, HttpResponse
from django.shortcuts import render

from environs import Env
from pathlib import Path

env = Env()
env.read_env()


r = redis.Redis(host="localhost", port=6379, decode_responses=True)


def weather(request, location):

    # Retrieve the date at which this method is invoked
    today = datetime.datetime.today().strftime("%Y-%m-%d")

    # Retrieve location from cache
    cachedLocationData = r.get(today + "_" + location.lower())

    cachedLocationData = json.loads(cachedLocationData)

    if cachedLocationData != None:
        return JsonResponse(cachedLocationData)

    apiKey = env.str("VISUAL_CROSSING_API_KEY")
    response = requests.request(
        "GET",
        f"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/{location}?unitGroup=metric&key={apiKey}&contentType=json",
    )

    if response.status_code != 200:
        return JsonResponse({"message": "Error retrieving request"}, status=400)

    # Save response to cache
    r.set(name=today + "_" + location.lower(), value=response.text, ex=12 * 60 * 60)

    # Parse the results as JSON
    jsonData = response.json()

    return JsonResponse(jsonData)

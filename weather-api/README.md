# Weather API

## Setup

To setup the project, please follow below steps:

1. Create the Python virtual environment

   `python -m venv weather-api-venv`

2. Activate the Python virtual environment

   Bash
   `source ./weather-api-venv/Scripts/activate`

3. Install the required packages to run `weather-api`

   `python -m pip install -r requirements.txt`

## Running the `weather-api` project

1. Start the Django WSGI webserver

   `python manage.py runserver`

2. Start accessing the `weather-api` API endpoints via `http://127.0.0.1:8000/weather/`

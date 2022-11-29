import requests
import math
import mysql.connector
import json


def weather_fetcher(icao):
    cursor = connection.cursor()
    cursor.execute("SELECT latitude_deg, longitude_deg FROM airport WHERE ident = '" + icao + "'")
    result = cursor.fetchall()
    for row in result:
        latitude = row[0]
        longitude = row[1]
        api_key = "628dc836c467279560786b9ec5b2a731"
        url = f"https://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid={api_key}"
        response = requests.get(url).json()
        temperature_celsius = response['main']['temp'] - 273.25  # converting it to celsius
        rounded_celsius = math.floor(temperature_celsius + 0.5)  # rounding
        wind_speed = response['wind']['speed']
        rounded_wind = math.floor(wind_speed + 0.5)
        weather_condition = {
            "main": response['weather'][0]['main'],
            "description": response['weather'][0]['description'],
            "icon": response['weather'][0]['icon'],
            "temp": rounded_celsius,
            "wind": rounded_wind
        }
        json.dumps(response, default=lambda o: o.__dict__, indent=4)
        return weather_condition


connection = mysql.connector.connect(
         host='127.0.0.1',
         port=3306,
         database='flight_game',
         user='root',
         password='CamdenTown',
         autocommit=True
         )

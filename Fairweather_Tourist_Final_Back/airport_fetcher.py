import mysql.connector
import json
from icao_weather_fetcher import weather_fetcher
from distance_co2_calculator import distance_emission_calculator


def airport_fetcher(icao):
    list_of_big_european_airports = []
    cursor = connection.cursor()
    cursor.execute(
        "SELECT airport.ident, airport.name, airport.municipality, country.name, airport.latitude_deg, airport.longitude_deg "
        "FROM airport, country WHERE airport.iso_country = country.iso_country AND airport.type = '" + "large_airport" + "'"
        "AND country.continent = '" + "EU" + "'")
    result = cursor.fetchall()
    if cursor.rowcount > 0:
        for row in result:
            if icao == row[0]:
                active = True
                weather = weather_fetcher(icao)
                response = {
                    "ident": row[0],
                    "active": active,
                    "name": row[1],
                    "location": row[2],
                    "country": row[3],
                    "latitude": row[4],
                    "longitude": row[5],
                    "weather": weather,
                }
                json.dumps(response, default=lambda o: o.__dict__, indent=4)
                list_of_big_european_airports.insert(0, response)
            else:
                active = False
                distance, co2_consumption = distance_emission_calculator(icao, row[0])
                response = {
                    "ident": row[0],
                    "active": active,
                    "name": row[1],
                    "location": row[2],
                    "country": row[3],
                    "latitude": row[4],
                    "longitude": row[5],
                    "distance": distance,
                    "co2_consumption": co2_consumption,
                }
                json.dumps(response, default=lambda o: o.__dict__, indent=4)
                list_of_big_european_airports.append(response)
    return list_of_big_european_airports


connection = mysql.connector.connect(
         host='127.0.0.1',
         port=3306,
         database='flight_game',
         user='root',
         password='CamdenTown',
         autocommit=True
         )

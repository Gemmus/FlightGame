# Flight Game Project 

A travel based game project that is implemented in two phases. The game allows the user to travel in Europe with limited CO2 budget to reach weather targets and guess the secret locations. Each hidden location is presented with a riddle. 

For travel destinations, an open source SQL database is utilized which contains all the available airports in the world. For the project, only the large European Airports were selected. MariaDB is used as the tool for database implementation during the design of
the game. With the altitute and the longitude of the aiports, the travel distance between two airports are calculated along with the rough estimation of CO2 consumption.

The real time weather condition of the selected locations is provided by [WeatherAPI](https://www.weatherapi.com/docs/). 
 
<h2> First Phase: Prototype </h2>
Programming language: python, IDE: PyCharm.

User interaction only via IDE. All rules and information is displayed through the console of the IDE and the user provides input via the same platform using keyboard.


![image](https://github.com/Gemmus/FlightGame/assets/112064697/cce1af53-2684-4c57-994c-bf8b219cd3e6)
<br><i>Figure 1. Example of console output: Guessing one of the right secret location and winning the game</i>

Prototype has two versions: Fairweather_Tourist.py has no implementation of real-time weather, while Fairweather_Tourist_with_API.py has.

<h2> Second Phase: User-Friendly Interface and Real-Time Weather</h2>
Implementation of Flask Cors, HTML, CSS, JavaScript parts, map as visual and real-time weather condition:

<li>Back-end: Python, SQL database, WeatherAPI, Flask Cors.</li>
<li>Front-end: HTML, CSS, JavaScript, <a href="https://leafletjs.com/">Leaflet</a>.</li>


The user plays the game using web browser and mouse.

![image](https://github.com/Gemmus/FlightGame/assets/112064697/3214b3c7-8f6a-432b-9577-7235f272d168)
<br><i>Figure 2. User Interface via Browser</i>

Scoring is based on the combinations of weather targets and secret locations. 

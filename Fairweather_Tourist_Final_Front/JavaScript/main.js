'use strict';
// Map
const map = L.map('map', {tap: false});
L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
}).addTo(map);
map.setView([60, 24], 7);

// Global variables:
const apiUrl = 'http://127.0.0.1:5000/';
let current_location = 'EFHK';
let list_of_visited_placed = ['EFHK'];
const activeIcon = L.divIcon({className: 'active-icon'});
const passiveIcon = L.divIcon({className: 'passive-icon'});
let score = 0;
let co2_consumed = 0;
let co2_budget = 2000;
let travelled_distance = 0;
let london = true;
let caparica = true;
let prague = true;
let ibiza = true;
let reykjavik = true;
let budapest = true;

// EventListener for username:
document.querySelector('#player-form').addEventListener('submit', function (evt) {
  evt.preventDefault();
  const playerName = document.querySelector('#player-input').value;
  document.getElementById('replace-name').innerHTML = `<b>${playerName}</b>`;
  document.querySelector('.update-box').innerHTML = `Welcome, ${playerName}! Let's select your first destination!`;
  document.querySelector('#player-modal').classList.add('hide');
  gameSetup(`${apiUrl}new_game?player=${playerName}&loc=${current_location}`);
});

// Setting up the game:
async function gameSetup(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    document.getElementById('current-weather-condition').innerHTML = data[0].weather.main;
    document.getElementById('current-temperature').innerHTML = `Temperature: ${data[0].weather.temp}°C`;
    document.getElementById('current-wind-speed').innerHTML = `Wind: ${data[0].weather.wind}m/s`;
    document.getElementById('current-airport').innerHTML = data[0].name;
    document.getElementById('current-city').innerHTML = data[0].location;
    document.getElementById('current-country').innerHTML = data[0].country;
    await addDestination(data)
      } catch (error) {
    console.log('Error1');
  }
  }

async function flyTo(url, previous_data) {
  console.log(previous_data);
  updateState(previous_data);
  try {
    const response = await fetch(url);
    const data = await response.json();
    updateWeather(data[0]);
    await addDestination(data);
  } catch (error) {
    console.log('Error 2')
  }
}

async function addDestination(data) {
  for (let airport of data) {
    const marker = L.marker([airport.latitude, airport.longitude]).addTo(map);
      if (airport.active) {
        marker.bindPopup(`Current location: <b>${airport.name}</b><br>${airport.location}, ${airport.country}`);
        marker.openPopup();
        marker.setIcon(activeIcon);
      } else {
        marker.setIcon(passiveIcon);
        const popupContent = document.createElement('div');
        popupContent.classList.add('pop-up')
        const content = document.createElement('p');
        content.innerHTML = `<b>${airport.name}</b><br>${airport.location}, ${airport.country}`;
        popupContent.append(content);
        const flyToBtn = document.createElement('button');
        flyToBtn.classList.add('button');
        flyToBtn.classList.add('travelBtn');
        flyToBtn.innerHTML = 'Travel';
        popupContent.classList.add('pop-up')
        popupContent.append(flyToBtn);
        marker.bindPopup(popupContent);
        flyToBtn.addEventListener('click', function () {
            flyTo(`${apiUrl}fly_to?new_loc=${airport.ident}`, airport);
        })
      }
  }
}

function updateWeather(data) {
      document.getElementById('current-weather-condition').innerHTML = data.weather.main;
    document.getElementById('current-temperature').innerHTML = `Temperature: ${data.weather.temp}°C`;
    document.getElementById('current-wind-speed').innerHTML = `Wind: ${data.weather.wind}m/s`;
}

function updateState(data) {
  list_of_visited_placed.push(data.ident);
  console.log(list_of_visited_placed);
  co2_consumed += data.co2_consumption;
  co2_budget -= data.co2_consumption;
  travelled_distance += data.distance;
  document.getElementById('current-co2-consumed').innerHTML = `CO2 generated: ${co2_consumed}kg`;
  document.getElementById('current-co2-available').innerHTML = `Available CO2: ${co2_budget}kg`;
  document.getElementById('current-odometer').innerHTML = `Travelled distance: ${travelled_distance}km`;
  document.getElementById('current-airport').innerHTML = data.name;
  document.getElementById('current-city').innerHTML = data.location;
  document.getElementById('current-country').innerHTML = data.country;
}


// fun fact functions
function londonPrinter() {
  london = false;
  const london_riddle = document.querySelector('.riddle1');
  london_riddle.classList.add('done');
  london_riddle.innerHTML = 'London, United Kingdom';
  document.querySelector('.text-box').innerHTML = `Fun fact:<br><b>“The guards of the tower of London are called “Meat Eaters”. This is due to their historical role as the most important royal guards, as they were promised a proper meal, containing meat, even if the rest of the nation had a food crisis.”</b>`;
}

function caparicaPrinter() {
  caparica = false;
  const caparica_riddle = document.querySelector('.riddle2');
  caparica_riddle.classList.add('done');
  caparica_riddle.innerHTML = 'Caparica, Portugal';
  document.querySelector('.text-box').innerHTML = `Fun fact:<br><b>“Costa da Caparica is a popular surfing spot as there are constant, but not massive waves. This beautiful, 26-kilometre long beach area also hosts many festivals, so don't be surprised to see people gathered here, especially on the weekends.”</b>`;
}

function praguePrinter() {
  prague = false;
  const prague_riddle = document.querySelector('.riddle3');
  prague_riddle.classList.add('done');
  prague_riddle.innerHTML = 'Prague, Czech Republic';
  document.querySelector('.text-box').innerHTML = `Fun fact:<br><b>“The Charles Bridge has some mathematical significance. Former Czech king Charles IV laid the first stone of the bridge at precisely 5.31 am on July 9, 1357. The king was so into astrology and numerology that he chose this date because of its written form: 1-3-5-7-9-7-5-3-1 (year, day, month, time).”</b>`;
}

function ibizaPrinter() {
  ibiza = false;
  const ibiza_riddle = document.querySelector('.riddle4');
  ibiza_riddle.classList.add('done');
  ibiza_riddle.innerHTML = 'Ibiza, Spain';
  document.querySelector('.text-box').innerHTML = `Fun fact:<br><b>“The correct pronunciation of the island’s name is ‘Evissa’. The settlers who founded Ibiza originally named it Ibozzim, and dedicated the island to Bes – the God of music and dance.”</b>`;
}

function reykjavikPrinter() {
  reykjavik = false;
  const reykjavik_riddle = document.querySelector('.riddle5');
  reykjavik_riddle.classList.add('done');
  reykjavik_riddle.innerHTML = 'Reykjavik, Iceland';
  document.querySelector('.text-box').innerHTML = `Fun fact:<br><b>“Any Icelandic horse that leaves the country is forever forbidden to return; such are the strict protocols that regulate breeding in Iceland. The Icelandic horse is among the world’s purest bred breeds, having been isolated for over 1000 years.”</b>`;
}

function budapestPrinter() {
  budapest = false;
  const budapest_riddle = document.querySelector('.riddle6');
  budapest_riddle.classList.add('done');
  budapest_riddle.innerHTML = 'Budapest, Hungary';
  document.querySelector('.text-box').innerHTML = `Fun fact:<br><b>“If you ever visit it, pay attention to the buildings. They are old, a lot of their facade is deteriorating and a lot of them have bullet marks from WWII and the Hungarian Revolution of 1956. When it gets dark, if you take a walk at the bank of the Danube, it’s beautifully lit up.”</b>`;
}

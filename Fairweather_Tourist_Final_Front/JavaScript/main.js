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
    // console.log(data);
    console.log(data[0]);
    document.getElementById('current-weather-condition').innerHTML = data[0].weather.main;
    document.getElementById('current-temperature').innerHTML = `Temperature: ${data[0].weather.temp}°C`;
    document.getElementById('current-wind-speed').innerHTML = `Wind: ${data[0].weather.wind}m/s`;
    document.getElementById('current-airport').innerHTML = data[0].name;
    document.getElementById('current-city').innerHTML = data[0].location;
    document.getElementById('current-country').innerHTML = data[0].country;
    for(let airport of data) {
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
  } catch (error) {
    console.log('Error1');
  }
  }

async function flyTo(url, data_rel_to_previous){
    console.log(data_rel_to_previous);
    try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data[0])
    } catch (error) {
      console.log('Error 2')
    }
  }

// fun fact functions
function london() {
  const london = document.querySelector('.riddle1');
  london.classList.add('done');
  london.innerHTML = 'London, United Kingdom'
  const output = document.querySelector('.text-box')
  output.innerHTML = `Fun fact:<br><b>“The guards of the tower of London are called “Meat Eaters”. This is due to their historical role as the most important royal guards, as they were promised a proper meal, containing meat, even if the rest of the nation had a food crisis.”</b>`
}

function caparica() {
  const caparica = document.querySelector('.riddle2');
  caparica.classList.add('done');
  caparica.innerHTML = 'Caparica, Portugal'
  const output = document.querySelector('.text-box')
  output.innerHTML = `Fun fact:<br><b>“Costa da Caparica is a popular surfing spot as there are constant, but not massive waves. This beautiful, 26-kilometre long beach area also hosts many festivals, so don't be surprised to see people gathered here, especially on the weekends.”</b>`
}

function prague() {
  const prague = document.querySelector('.riddle3');
  prague.classList.add('done');
  prague.innerHTML = 'Prague, Czech Republic'
  const output = document.querySelector('.text-box')
  output.innerHTML = `Fun fact:<br><b>“The Charles Bridge has some mathematical significance. Former Czech king Charles IV laid the first stone of the bridge at precisely 5.31 am on July 9, 1357. The king was so into astrology and numerology that he chose this date because of its written form: 1-3-5-7-9-7-5-3-1 (year, day, month, time).”</b>`
}

function ibiza() {
  const ibiza = document.querySelector('.riddle4');
  ibiza.classList.add('done');
  ibiza.innerHTML = 'Ibiza, Spain'
  const output = document.querySelector('.text-box')
  output.innerHTML = `Fun fact:<br><b>“The correct pronunciation of the island’s name is ‘Evissa’. The settlers who founded Ibiza originally named it Ibozzim, and dedicated the island to Bes – the God of music and dance.”</b>`
}

function reykjavik() {
  const reykjavik = document.querySelector('.riddle5');
  reykjavik.classList.add('done');
  reykjavik.innerHTML = 'Reykjavik, Iceland'
  const output = document.querySelector('.text-box')
  output.innerHTML = `Fun fact:<br><b>“Any Icelandic horse that leaves the country is forever forbidden to return; such are the strict protocols that regulate breeding in Iceland. The Icelandic horse is among the world’s purest bred breeds, having been isolated for over 1000 years.”</b>`
}

function budapest() {
  const budapest = document.querySelector('.riddle6');
  budapest.classList.add('done');
  budapest.innerHTML = 'Budapest, Hungary'
  const output = document.querySelector('.text-box')
  output.innerHTML = `Fun fact:<br><b>“If you ever visit it, pay attention to the buildings. They are old, a lot of their facade is deteriorating and a lot of them have bullet marks from WWII and the Hungarian Revolution of 1956. When it gets dark, if you take a walk at the bank of the Danube, it’s beautifully lit up.”</b>`
}

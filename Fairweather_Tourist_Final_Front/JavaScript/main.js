'use strict';
// map
const map = L.map('map', {tap: false});
L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
}).addTo(map);
map.setView([60, 24], 7);


const apiUrl = 'http://127.0.0.1:5000/';
let current_location = 'EFHK';
let list_of_visited_placed = ['EFHK'];
const activeIcon = L.divIcon({className: 'active-icon'});
const passiveIcon = L.divIcon({className: 'passive-icon'});

document.querySelector('#player-form').addEventListener('submit', function (evt) {
  evt.preventDefault();
  const playerName = document.querySelector('#player-input').value;
  document.getElementById('replace-name').innerHTML = `<b>${playerName}</b>`;
  document.querySelector('.update-box').innerHTML = `Welcome, ${playerName}! Let's select your first destination!`;
  document.querySelector('#player-modal').classList.add('hide');
  gameSetup(`${apiUrl}new_game?player=${playerName}&loc=${current_location}`);
});

async function gameSetup(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
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
      }
    }
  } catch (error) {
    console.log('Error1');
  }
  }



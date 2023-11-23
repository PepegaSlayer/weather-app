const weatherButton = document.querySelector('.weather-button');
const infoContainer = document.querySelector('.info-container');

/* Инициализация велеколепной карты HERE */

var platform = new H.service.Platform({
    'apikey': 'pzwo2JeDqt-1gvkAFizBfeR6RN-C7nT5jNkW2hiw3f8'
});

var defaultLayers = platform.createDefaultLayers();

var map = new H.Map(
    document.querySelector('.mapContainer'),
    defaultLayers.vector.normal.map,
    {
        zoom: 11,
        center: { lat: 52.5, lng: 13.4 }
    });

var mapEvents = new H.mapevents.MapEvents(map);

var behavior = new H.mapevents.Behavior(mapEvents);

/* ---             HERE              --- */

weatherButton.addEventListener('click', function () {
    const latitude = document.querySelector('.latitude').value;
    const longitude = document.querySelector('.longitude').value;
    map.setCenter({ lat: latitude, lng: longitude });

    fetch('https://api.weatherapi.com/v1/current.json?key=34eba9a155ff4e09bbc85232232311&q=' + latitude + ',' + longitude, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            infoContainer.insertBefore(getNewWaether(data), infoContainer.childNodes[0]);
        })
        .catch(error => {
            console.log(error);
        });
});

function getNewWaether(data)
{
    var newElement = document.createElement('li');
    newElement.innerHTML = `
    <div class="info main-section shadow">
        <ul class="info-list">
            <li class="info-item">
                <img class="weather-icon" src="${'http:' + data['current']['condition']['icon']}">
            </li>
            <li class="info-item">
                <label class="temperature">${data['current']['temp_c'] + '°C'}</label>
            </li>
            <li class="info-item">
                <label class="wind">${(data['current']['wind_kph'] * 1000 / 3600).toFixed(2)} м/с </label>
            </li>
        </ul>
    </div>
    `;
    return newElement;
}



import React, { useState } from 'react';
import './App.css';

function App() {
  
  const [weather, setWeather] = useState({});
  const [location, setLocation] = useState('Berlin')
  const apiKey = '76213925c4e0771dbabb037e3a681e74'


  async function getWeather(e){
    
    let geoData = {};
    if(e.key==='Enter')
    {
    await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${e.target.value}&&appid=${apiKey}`,{mode: 'cors'})
      .then((response) => response.json())
      .then((data) => {
        console.log(`lat: ${data[0].lat},lon: ${data[0].lon}`)
        geoData = data;
        setLocation(geoData[0].name)
        console.log(geoData)
      });
    await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geoData[0].lat}&lon=${geoData[0].lon}&units=imperial&appid=${apiKey}`,{mode: 'cors'})
        .then((response) => response.json()) 
        .then((data)=>{
          setWeather(data)})
        }
  }

  return (
    <div className="App">
      <div className="container">
      {Object.keys(weather).length ? 
      <div className="weatherIndicators"> 
      <div className="mainIndicators">
      <input placeholder="enter location" onKeyPress={getWeather} />
      <h1>{location}</h1>
      <h1>{Object.keys(weather).length > 0 ? `${weather.main.temp} F°`  : ''}</h1>
      </div>
      <div className="secondaryIndicators">
        <p>Feels like: {weather.main.feels_like} F°</p>
        <p>Humidity: {weather.main.humidity}</p>
        <p>Wind: {weather.wind.speed} mph</p>
        <p>Forecast: {weather.weather[0].description}</p>
      </div></div> : 
      <div className="weatherIndicators">
         <div className="mainIndicators">
       <input placeholder="enter location" onKeyPress={getWeather} />
      <h1>Berlin</h1>
      <h1>67F°</h1>
      </div>
      <div className="secondaryIndicators">
        <p>Feels like: 68F°</p>
        <p>Humidity: 45%</p>
        <p>Wind: 2.3 mph</p>
        <p>Forecast: Overcast</p>
      </div>
  
        </div>}
    </div>
    </div>
  );
}

export default App;

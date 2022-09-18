import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  
  const [weather, setWeather] = useState({});
  const [tempUnit, setTempUnit] = useState('F');
  const [location, setLocation] = useState('')
  const apiKey = '76213925c4e0771dbabb037e3a681e74'
  useEffect(() => {
    setLocation('Berlin');
   
    }, []);

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
    }
    await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geoData[0].lat}&lon=${geoData[0].lon}&units=imperial&appid=${apiKey}`,{mode: 'cors'})
        .then((response) => response.json()) 
        .then((data)=>{
          setWeather(data)})
          console.log(weather)
  }

  return (
    <div className="App">
      <input placeholder="enter location" onKeyPress={getWeather} />
      <h1>{location}</h1>
      <h1>{Object.keys(weather).length > 0 ? `${weather.main.temp} F°`  : ''}</h1>
      <ul>
        <li key={Math.random()}><p>Feels like: {weather.main.feels_like}</p></li>
        <li key={Math.random()}><p>Humidity: {weather.main.humidity}</p></li>
        <li key={Math.random}><p>Wind: {weather.wind.speed} mph</p></li>
        <li key={Math.random}><p>Forecast: {weather.weather[0].description}</p></li>
      </ul>
    </div>
  );
}

export default App;

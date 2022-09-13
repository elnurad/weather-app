import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  
  const [weather, setWeather] = useState(undefined);
  const apiKey = '76213925c4e0771dbabb037e3a681e74'

  const getWeather =(e)=> {
    if(e.key==='Enter')
    {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=london&appid=${apiKey}`,{mode: 'cors'})
      .then((response) => response.json())
      .then((data) => console.log(`lat: ${data[0].lat},lon: ${data[0].lon}`));
    }
    //fetch weather date and set weather to data
 
  }
  return (
    <div className="App">
      <input placeholder="enter location" onKeyPress={getWeather} />
    </div>
  );
}

export default App;

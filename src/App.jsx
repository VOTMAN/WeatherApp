import { useState, useEffect } from "react";
import "./index.css";
import CurrentWeather from "./components/CurrentWeather";


const apiKey = "eb7375b0c3604e082f1d8ccfc5b1dde9"

function App() {
  const [city, setCity] = useState("Hyderabad");
  const [weather, setWeather] = useState({
    status: null,
    data: {}
  })
  const [forecast, setForecast] = useState({
    status: null,
    data: {}
  })

  const handleValueInput = (e) => {
    setCity(e.target.value)
  }

  const getLocationCoordinates = async () => {
    const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`)
    const data = await res.json();
    // console.log(data)
    return {
      lat: data[0].lat,
      lon: data[0].lon
    }
  }

  const getForecast = async () => {

  }

  const getCurrentWeather = async () => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    const data = await res.json()
    return data
  } 
  const getWeatherData = async (e) => {
    e.preventDefault();
    const {lat, lon} = await getLocationCoordinates()
    const data = await getCurrentWeather()
    const fc = await getForecast()
    console.log(data);

    const updatedWeather = {
      status : data.cod, 
      data : {
        city: data.name,
        country: data.sys.country,
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        temp: data.main.temp,
        desc: data.weather[0].description,
        icon: data.weather[0].icon,
        looksLike: data.weather[0].main
      }
    }
    setWeather(updatedWeather)
    // console.log(weather)
  }
  return (
    <>
    <div id="container">
      <h1>Weather App</h1>
      <form onSubmit={getWeatherData}>
        <input
          type="text"
          name="city"
          id="cityInput"
          placeholder="Enter your city"
          value={city}
          onChange={handleValueInput}
          /><br/>
        <button type="submit">Get Weather</button>
      </form>
      {weather.status === 200 ? <CurrentWeather weatherData = {weather}/> : <h4>Press the button</h4>}
    </div>
    </>
  );
}

export default App;

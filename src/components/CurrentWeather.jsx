import "../index.css"
import {useEffect} from "react"

const CurrentWeather = (weatherData) => {
  const data = weatherData.weatherData.data
  const iconUrl = "https://openweathermap.org/img/wn/"+ data.icon +"@4x.png"
  useEffect(() => {
    console.log(data);
  },[data])
  return (
    <>
        <div id="currentDataBox">
            <h1>{data.city}, {data.country}</h1>
            <img src={iconUrl} alt={data.lookLike} />  
            <div id="weatherBox">
                <div>
                    <h4>{(Math.floor(data.temp))} °C</h4>
                    <h6>{data.desc}</h6>
                </div>
                <div>
                    <h4>feelsLike</h4>
                    <h6>{Math.floor(data.feelsLike)} °C</h6>
                </div>
                <div>
                    <h4>Humidity</h4>
                    <h6>{Math.floor(data.humidity)}%</h6>
                </div>
            </div>
        </div>
            
    </>
  )
}
export default CurrentWeather
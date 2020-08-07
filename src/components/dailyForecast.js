import React from 'react'
import './dailyForecast.css'

function DayForecast({weather, time}) {
    return(
        <div className="day-forecast">
            <p> UV index: {weather.uvi} </p>
            <p> Pressure: {weather.pressure} </p>
            <p> Humidity: {weather.humidity} %</p>
            <p> Precipitation: {weather.rain} mm</p>
            <p> Wind Speed: {weather.wind_speed} m/s</p>
        </div>
    )
}

export default DayForecast;
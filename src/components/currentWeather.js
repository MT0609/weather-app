import React from 'react'
import PropTypes from 'prop-types'
import './currentWeather.css'

CurrentWeather.propTypes = {
    weather: PropTypes.object
}

CurrentWeather.defaultProps = {
    weather: {}
}

function CurrentWeather(props) {
    const {weather} = props;

    return(
        <div className="current-component">
            <div className="current left">
                <p> <i class="fa fa-location-arrow" style={{fontSize:"30px", color:"red" }}></i> (latitude, longitude): ({weather.lat}, {weather.lon}) </p>
                <p> 
                    <img id="weather-icon" src={"http://openweathermap.org/img/w/" + weather.weather.icon + ".png"}  alt="weather-icon" />
                    <span> <span id="temperature">{weather.current.temp}</span> degree </span>
                </p>
            </div>
            <div className="current middle">
                <p> {weather.weather.description} </p>
                <p> UV index: {weather.current.uvi} </p>
                <p> Pressure: {weather.current.pressure} </p>
            </div>
            <div className="current-right">
                <p> Humidity: {weather.current.humidity} %</p>
                <p> Visibility: {weather.current.visibility} meters</p>
                <p> Wind Speed: {weather.current.wind_speed}</p>
            </div>  
        </div>
    )
}

export default CurrentWeather;
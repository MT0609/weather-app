import React from 'react'
import './notLocated.css'

function NotLocated() {
    return(
        <div id="not-locate">
            <img className="weather-icon" src="https://openweathermap.org/img/wn/04d.png" alt="weather-icon" />
            <p className="alert">CHECK THE GEOLOCATION OF YOUR BROWSER</p>
        </div>
    )
}

export default NotLocated;
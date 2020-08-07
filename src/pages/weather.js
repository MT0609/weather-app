import React, {useState, useEffect} from 'react';
import { Chart } from "react-google-charts";
import CurrentWeather from '../components/currentWeather';
import DayForecast from '../components/dailyForecast';
import ReactHover, { Trigger, Hover } from 'react-hover'
import './weather.css'

function Weather() {
    const [currentWeather, setcurrentWeather] = useState({ 
        lat: "", lon: "", current: {}, weather: {}
    });
    const [hourly, setHourly] = useState([])
    const [daily, setDaily] = useState([])


    async function getCurrentPositionWeather(lat, long) {
        let data = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)        
        let res = await data.json();
        setcurrentWeather({
            ...currentWeather, lat: res.lat, lon: res.lon, current: res.current, weather: res.current.weather[0]
        });

        let {hourly} = res;
        setHourly(hourly);

        let {daily} = res;
        setDaily(daily);
    }
    
    useEffect(() => {
        if ("geolocation" in navigator) 
        {  
            navigator.geolocation.getCurrentPosition(function(position) {
                let lat = position.coords.latitude;
                let long = position.coords.longitude;
                getCurrentPositionWeather(lat,long);
            });
        }
        else
            console.log("not found")
    }, [])

    const hourlyChart = (dataset) => {
        let chart = null;
        let data = [];   // Format [day, infections, deaths, recovered]
        data.push([{type: 'date', label: 'Date'}, 'Temperature', 'Probability of Precipitation']);
        let currentTime = new Date();
        for (let i = 0; i < dataset.length; i++) {
            let time=new Date();
            time.setHours(currentTime.getHours() + i);
            data.push([time, dataset[i].temp, dataset[i].pop * 100]);
        }
        chart = <Chart
            width={"100%"}
            height={"100%"}
            chartType="Line"
            data={data}
            options={{
                series: {
                    // Gives each series an axis name that matches the Y-axis below.
                    0: { axis: 'Temps' },
                    1: { axis: 'Daylight' },
                    },
                axes: {
                    // Adds labels to each axis; they don't have to match the axis names.
                    y: {
                        Temps: { label: 'Temps (Celsius)' },
                        Daylight: { label: 'Chance of Rain (%)' },
                    },
                },
            }}
            rootProps={{ 'data-testid': '1' }}
        />
        return chart;
      }

    const optionsCursorTrueWithMargin = {
        followCursor: true,
        shiftX: 30,
        shiftY: -90
    }
    const renderForecast = (dataset) => {
        let forecasts = [];
        let date = new Date();
        for (let i = 0; i < dataset.length; i++) {
                let dayForecast = (
                    <ReactHover options={optionsCursorTrueWithMargin}>
                        <Trigger type='trigger'>
                            <div className="react-trigger">
                                <p>{JSON.stringify(date).substring(1, 11)}</p>
                                <img id="weather-icon" src={"http://openweathermap.org/img/w/" + dataset[i].weather[0].icon + ".png"}  alt="weatherForecast-icon" />
                                <p> {dataset[i].weather[0].description} </p>
                            </div>
                        </Trigger>
                        <Hover type='hover'>
                            <DayForecast weather={dataset[i]} time={JSON.stringify(date)} />
                        </Hover>
                    </ReactHover>
                )
                date.setDate(date.getDate() + 1);
                forecasts.push(dayForecast);
        }
        forecasts.shift();
        return forecasts;
    }

    return(
        <div id="weather-page">
            <h1>Weather forecast</h1>
            <div className="current">
                <CurrentWeather weather={currentWeather} />
            </div>
            <hr></hr>

            <div className="hourly-daily">
                <div id="hourly-chart">
                    { hourlyChart(hourly) }
                </div>
                <div id="forecast">
                    { renderForecast(daily) }
                </div>
            </div>
        </div>  
    )
}

export default Weather;
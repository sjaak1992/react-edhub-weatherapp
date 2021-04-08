import React, {useEffect, useState} from 'react';
import './ForecastTab.css';
import axios from "axios";
import {apiKey} from "../../App";

function createDateString(timestamp) {
    const day = new Date(timestamp * 1000);

    return day.toLocaleDateString('nl-NL', { weekday: 'long' });
}

//axios importeren x
//useEffect
//async
// axios.get // url aanpassen props.coordinates.lat props.coordinates.lon
// response checken
// state aanmaken, nu gaan we de response opslaan (forecasts, setForcasts)
//response opslaan in de state
//response laten zien (JSX)


function ForecastTab(props) {
    console.log("props in forecast:", props.coordinates); // nu krijg je een object met coordinates, props zijn meegegeven aan component
    const [forecasts, setForcasts] = useState(null);

    useEffect(() => {
        console.log("effect in forecast")

        async function getData() {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${props.coordinates.lat}&lon=${props.coordinates.lon}&exclude=minutely,current,hourly&appid=${apiKey}&lang=nl`);
            // console.log("WAT ZIT HIERIN?:", response)
            setForcasts(response.data.daily);
        }

        if (props.coordinates) {  //if props.coordinates is ture -> getData
            getData();
        }

    }, [props.coordinates]) // effect uitvoeren wanneer coordeinates veranderen


    console.log("forecasts?:", forecasts);


    return (
        <div className="tab-wrapper">
            {forecasts &&
            forecasts.slice(0, 5).map((forecast) => {
                // console.log("FORECASTS??", forecast);
                return (
                    <article key={forecast.dt} className="forecast-day">
                        <p className="day-description">{createDateString(forecast.dt)}</p>

                        <section className="forecast-weather">
                            <span>{forecast.temp.day}</span>
                            <span className="weather-description">
                  {forecast.weather[0].description}
                </span>
                        </section>
                    </article>
                );
            })}
        </div>
    );
}

export default ForecastTab;

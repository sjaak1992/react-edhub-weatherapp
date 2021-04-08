import React, {useState, useEffect} from 'react';
import SearchBar from './components/searchBar/SearchBar';
import TabBarMenu from './components/tabBarMenu/TabBarMenu';
import MetricSlider from './components/metricSlider/MetricSlider';
import './App.css';
import axios from 'axios';
import ForecastTab from "./pages/forecastTab/ForecastTab";


export const apiKey = "3ddb15ebe6322101df105688857e4cfd";


function App() {

    const [weatherData, setWeatherData] = useState(null);
    const [location, setLocation] = useState('');
    const [error, setError] = useState(false);
    const [loading, toggleLoading] = useState('');


    useEffect(() => {
        async function fetchData() {
            setError('');
            toggleLoading(true);

            try {

                const result = await
                    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location},nl&appid=${apiKey}&lang=nl`);
                setWeatherData(result.data);
                console.log(result.data)

            } catch (e) {
                setError('Whoops, something went wrong!');
                console.error(e);
            }
            toggleLoading(false);

        }

        if (location) {
            fetchData();
        }
    }, [location]);

    return (
        <>
            <div className="weather-container">

                {/*HEADER -------------------- */}
                <div className="weather-header">
                    <SearchBar setLocationHandler={setLocation}/>

                    {/*// set location = dit is callback prop, een functie die de waarde terug geeft, we geven hier props door
                     passing props down(name: setLocationHandle, value:setLocation) je kan de state veranderen in de app.
                    */}


                    <span className="location-details">
            {weatherData &&
            <>
                <h2>{weatherData.weather[0].description}</h2>
                <h3>{weatherData.name} </h3>
                <h1>{weatherData.main.temp}</h1>
            </>
            }       </span>


                    {/*            <button*/}
                    {/*                type="button"*/}
                    {/*                onClick={fetchData}*/}
                    {/*            >*/}
                    {/*  Haal data op!*/}
                    {/*</button>*/}


                </div>

                {/*CONTENT ------------------ */}
                <div className="weather-content">
                    <TabBarMenu/>

                    <div className="tab-wrapper">
                        <ForecastTab coordinates={weatherData && weatherData.coord}/>
                        {/*// props doorgeven*/}
                    </div>
                </div>

                <MetricSlider/>
            </div>
        </>
    );
}

export default App;

import React, { useContext, useEffect, useState } from 'react'
import cityData from '../city.json'
import { CityContext } from '../Context/CityContext';
import { Link } from 'react-router-dom';
import axios from 'axios';


function Navbar() {

    const cities = cityData.cities;
    const [selectedCity, setSelectedCity] = useState('');
    const { updateCityData } = useContext(CityContext);
    useEffect(() => {
        (async () => {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Ahmedabad&appid=beaac372a350a7fa2168731fc2f6fc8d`);

            const WeatherPayload = {
                name: response.data.name,
                temp: response.data.main.temp,
                weather: response.data.weather[0].main,
                fellsLike: response.data.main.feels_like
            }

            // console.log(response, 'This is response ');
            updateCityData(WeatherPayload)
        })()

    }, [])


    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=beaac372a350a7fa2168731fc2f6fc8d`);

            const WeatherPayload = {
                name: response.data.name,
                temp: response.data.main.temp,
                weather: response.data.weather[0].main,
                fellsLike: response.data.main.feels_like
            }
            // console.log(WeatherPayload, 'This is response ');
            updateCityData(WeatherPayload);

        } catch (error) {
            console.log(error, 'this is error of fetching api in mumbai page');
        }
        console.log(selectedCity, 'citydata');
    };
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Weather App</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <Link to="/" className="nav-link active" aria-current="page">Home</Link>
                            <li className="nav-item">
                                <a className="nav-link active" href="#">About</a>
                            </li>
                        </ul>

                        <form className="d-flex" onSubmit={handleClick}>
                            <select className=" me-2 form-control" placeholder="Search" onChange={(e) => setSelectedCity(e.target.value)} aria-label="Search" >
                                <option value="">Select a City</option>
                                {cities
                                    .map((city, index) =>
                                        <option key={index} value={city} >{city}</option>
                                    )}
                            </select>
                            <button className="btn btn-outline-success" type="submit" >Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar

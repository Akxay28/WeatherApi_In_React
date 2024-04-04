import React, { useContext, useEffect, useState } from 'react'
import { CityContext } from '../Context/CityContext';
import axios from 'axios';


function Card() {
    const [weatherData, setweatherData] = useState(false)
    const { cityData } = useContext(CityContext);
    const [data, setdata] = useState('')
    const [temp, settemp] = useState('')
    const [weather, setweather] = useState('')
    const [currentTime, setcurrentTime] = useState('')

    useEffect(() => {
        fetchingApi();
        fetchingTime();
    }, [cityData])

    const fetchingTime = async () => {
        try {
            const response = await axios.get("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
            console.log(response.data.datetime);
            setcurrentTime(response.data.datetime)

        } catch (error) {
            console.log(error, 'this is error of time in card page');
        }
    }

    const fetchingApi = async () => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityData ? cityData : 'Ahmedabad'}&appid=beaac372a350a7fa2168731fc2f6fc8d`);
            // console.log(response.data);
            setdata(response.data);
            settemp(response.data.main);
            setweather(response.data.weather);
            setweatherData(true)
        } catch (error) {
            console.log(error, 'this is error of fetching api in mumbai page');
        }
    }

    return (
        <>

            {weatherData && (
                <div className="container mx-auto mt-5 border ">
                    <h2 className='text-center mt-5 mb-5'>Welcome to Weather App</h2>
                    <section className="vh-60 border rounded-pill " style={{ backgroundColor: '#f5f6f7' }}>
                        <div className="container  p-5">
                            <h2 className='text-center'>{data.name} Current Time {currentTime} and  Weather</h2>
                            <div className="row  d-flex justify-content-center align-items-center mt-5">
                                <div className="col-md-10 col-lg-8 col-xl-6" >
                                    <div className="card  bg-dark text-white">
                                        <div className="bg-image" style={{ borderRadius: '35px' }}>
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/draw1.webp"
                                                className="card-img" alt="weather" />
                                            <div className="mask" style={{ backgroundColor: 'rgba(190, 216, 232, .5)' }}></div>
                                        </div>
                                        <div className="card-img-overlay text-dark p-5">

                                            <h3 className="mb-0">{data.name}, In</h3>
                                            <hr />
                                            {temp && (
                                                <p className="display-2 mt-3 my-3 fs-4">Current temprature is <u><strong>{(temp.temp - 273.15).toFixed(1)}°C</strong></u></p>
                                            )}
                                            <p className="display-2 fs-4 mb-3">Temprature min: <strong>{(temp.feels_like - 273.15).toFixed(1)}</strong></p>
                                            {weather && weather.length > 0 && weather.map((item, index) => (
                                                <p className=' display-2 fs-4' key={index}>Sky Full OF : {item.main}</p>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section >
                </div>

            )
            }

        </>
    )
}

export default Card

import React, { useContext, useEffect, useState } from 'react'
import { CityContext } from '../Context/CityContext';
import axios from 'axios';
import moment from "moment";


function Card() {
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
            setcurrentTime(response.data.datetime)

        } catch (error) {
            console.log(error, 'this is error of time in card page');
        }
    }

    const fetchingApi = async () => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityData ? cityData : 'Ahmedabad'}&appid=beaac372a350a7fa2168731fc2f6fc8d`);
            setdata(response.data);
            settemp(response.data.main);
            setweather(response.data.weather);
        } catch (error) {
            console.log(error, 'this is error of fetching api in mumbai page');
        }
    }
    return (
        <>


            <div className="container mx-auto mt-5 border ">
                <h2 className='text-center mt-5 mb-5'>Welcome to Weather App</h2>
                <section className="vh-60 border rounded-pill " style={{ backgroundColor: '#f5f6f7' }}>
                    <div className="container  p-5">
                        <h2 className='text-center'>{data.name} Current Time {moment(currentTime).format('HH:mm:ss')} and  Weather</h2>
                        <div className="row  d-flex justify-content-center align-items-center mt-5">
                            <div className="col-md-10 col-lg-8 col-xl-6" >
                                <div className="card  bg-dark text-white">
                                    <div className="bg-image" id='image' style={{ borderRadius: '35px' }}>
                                        {weather && weather.map((item, index) => {
                                            if (item.main === 'Smoke') {
                                                return (
                                                    <img src="https://c0.wallpaperflare.com/preview/992/147/619/weather-smoke-smog-pollution.jpg"
                                                        className="card-img" alt="weather" />
                                                );
                                            } else if (item.main === 'Haze') {
                                                return (
                                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiooRr0dB2aTCCPSRm2YU_VIo_nyfs3844UQ&ss"
                                                        className="card-img" alt="weather" style={{ objectFit: 'contain' }} />

                                                );
                                            } else if (item.main === 'Clouds') {
                                                return (
                                                    <img key="clouds" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBeyyPlr8CoqAU_4RfXZYJ8cLFUffa5vp1oA&s"
                                                        className="card-img" alt="weather" style={{ objectFit: 'cover' }} />
                                                );
                                            } else if (item.main === 'Clear') {
                                                return (
                                                    <img key="clouds" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnlm9Q-8Gl8j6VrhRk0eohrzPe4JPYjCqRWQ&s"
                                                        className="card-img" alt="weather" style={{ objectFit: 'cover' }} />
                                                );
                                            }
                                            else {
                                                return (
                                                    <img key="default" src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/draw1.webp"
                                                        className="card-img" alt="weather" />
                                                );
                                            }


                                        })}

                                        <div className="mask" style={{ backgroundColor: 'rgba(190, 216, 232, .5)' }}></div>
                                    </div>
                                    <div className="card-img-overlay text-dark p-5 text-white">

                                        <h3 className="mb-0">{data.name}, In</h3>
                                        <hr />
                                        {temp && (
                                            <p className="display-2 mt-3 my-3 fs-4">Current temprature is <u><strong>{(temp.temp - 273.15).toFixed(1)}°C</strong></u></p>
                                        )}
                                        <p className="display-2 fs-4 mb-3">Temprature min: <strong>{(temp.feels_like - 273.15).toFixed(1)}</strong></p>
                                        {weather && weather.length > 0 && weather.map((item, index) => (
                                            <div key={index}>
                                                <p className='display-2 fs-4' key={index}>Sky Full OF : {item.main}</p>

                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >
            </div>
        </>
    )
}

export default Card

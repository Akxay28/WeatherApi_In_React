import React, { useContext, useEffect, useState } from 'react'
import { CityContext } from '../Context/CityContext';
import axios from 'axios';
import moment from "moment";

function Card() {

    const { cityData } = useContext(CityContext);
    console.log(cityData, 'citydata');
    const [currentTime, setcurrentTime] = useState('')

    useEffect(() => {
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

    return (
        <>

            <div className="container mx-auto mt-5 border ">
                <h2 className='text-center mt-5 mb-5'>Welcome to Weather App</h2>
                <section className="vh-60 border rounded-pill mb-5" style={{ backgroundColor: '#f5f6f7' }}>
                    <div className="container  p-5">
                        <h2 className='text-center'>{cityData.name} Current Time {moment(currentTime).format('HH:mm:ss')} and  Weather</h2>
                        <div className="row  d-flex justify-content-center align-items-center mt-5">
                            <div className="col-md-10 col-lg-8 col-xl-6" >
                                <div className="card  bg-dark text-white">
                                    <div className="bg-image" id='image' style={{ borderRadius: '35px' }}>
                                        {cityData.weather && cityData.weather.length > 0 && (
                                            cityData.weather === 'Smoke' ? (
                                                <img src="https://c0.wallpaperflare.com/preview/992/147/619/weather-smoke-smog-pollution.jpg"
                                                    className="card-img" alt="weather" />
                                            ) : cityData.weather === 'Haze' ? (
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiooRr0dB2aTCCPSRm2YU_VIo_nyfs3844UQ&ss"
                                                    className="card-img" alt="weather" style={{ objectFit: 'contain' }} />
                                            ) : cityData.weather === 'Clouds' ? (
                                                <img key="clouds" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBeyyPlr8CoqAU_4RfXZYJ8cLFUffa5vp1oA&s"
                                                    className="card-img" alt="weather" style={{ objectFit: 'cover' }} />
                                            ) : cityData.weather === 'Clear' ? (
                                                <img key="clouds" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnlm9Q-8Gl8j6VrhRk0eohrzPe4JPYjCqRWQ&s"
                                                    className="card-img" alt="weather" style={{ objectFit: 'cover' }} />
                                            ) : (
                                                <img key="default" src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/draw1.webp"
                                                    className="card-img" alt="weather" />
                                            )
                                        )}

                                        <div className="mask" style={{ backgroundColor: 'rgba(190, 216, 232, .5)' }}></div>
                                    </div>
                                    <div className="card-img-overlay text-dark p-5 text-white">
                                        <h3 className="mb-0 text-dark text-center">{cityData.name}, In</h3>
                                        <hr className='text-dark' />
                                        <p className="display-2 mt-3 my-3 fs-4">Current temprature is <u><strong>{(cityData.temp - 273.15).toFixed(1)}°C</strong></u></p>
                                        <p className="display-2 fs-4 mb-3">Temprature min: <strong>{(cityData.fellsLike - 273.15).toFixed(1)}</strong></p>
                                        <p className='display-2 fs-4' >Sky Full OF : {cityData.weather}</p>
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

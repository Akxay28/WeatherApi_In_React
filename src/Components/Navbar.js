import React, { useContext, useState } from 'react'
import cityData from '../city.json'
import { CityContext } from '../Context/CityContext';
import { Link } from 'react-router-dom';


function Navbar() {

    const cities = cityData.cities;
    const [selectedCity, setSelectedCity] = useState('');
    const { updateCityData } = useContext(CityContext);

    const handleClick = (e) => {
        e.preventDefault();
        console.log(selectedCity, 'citydata');
        updateCityData(selectedCity); // Update the city data in the store
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

import React, { createContext, useState } from 'react';

export const CityContext = createContext();

export const CityProvider = ({ children }) => {
    const [cityData, setCityData] = useState({});

    const updateCityData = (data) => {
        setCityData(data);
    };

    return (
        <CityContext.Provider value={{ cityData, updateCityData }}>
            {children}
        </CityContext.Provider>
    );
};
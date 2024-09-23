import React, {useEffect, useState} from "react";
import WeatherIcon from "../WeatherIcon/WeatherIcon";
import fetchWeatherApi from '../../services/weatherApis';
import { getMappedWeather } from "../weatherMappings";
import "./CitySimpleWeatherCards.css"
import { any } from "prop-types";
interface CitySimpleWeatherCardProps {
  handleCity: (city: string) => void;
}

const CitySimpleWeatherCards: React.FC<CitySimpleWeatherCardProps> = (props) =>{
  const [LocationStates, setLocationStates] = useState<Record<string, any>>({
    Sydney: any,
    Shanghai: any,
    'New York': any,
    London: any,
  });

  const retrieveCityWeather = async (city: string) => {
    try {
      const weatherData = await fetchWeatherApi(city);
      if (weatherData) {
        setLocationStates((prevStates) => ({
          ...prevStates,
          [city]: weatherData.forecast.forecastday[0]
        }));
      }
    } catch (error) {
      console.log(`Failed to fetch weather for ${city}:`, error);
    }
  };

  useEffect( ()=>{
    const cities = ['Sydney', 'Shanghai', 'New York', 'London'];
    cities.forEach((city) => {
      retrieveCityWeather(city);
    });

  },[]);

  const cityBackgrounds: { [key: string]: string } = {
    London: '/assets/city/London.png',
    'New York': '/assets/city/Newyork.png',
    Shanghai: '/assets/city/Shanghai.png',
    Sydney: '/assets/city/Sydney.png'
  };
  
  return (
    <>
      <div className="city-simple-weathercard">
        {Object.keys(LocationStates).map((city: string) => (
          <div className="sub-column" 
            style={{backgroundImage: `url(${cityBackgrounds[city]})`} } 
            onClick={() => props.handleCity(city) } key={city}
          >
            <WeatherIcon weather={getMappedWeather(LocationStates[city].day?.condition.text)} />
            <div className="city">{city}</div>            
            <div className="temperature_range">{`${LocationStates[city].day?.mintemp_c} - ${LocationStates[city].day?.maxtemp_c}°`}</div>
          </div>
        ))}
    </div>
    </>
  )
}

export default CitySimpleWeatherCards;
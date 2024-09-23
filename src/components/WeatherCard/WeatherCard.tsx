import React, {useEffect, useState} from "react";
import CityWeatherCard from "../CityWeatherCard/CityWeatherCard";
import FutureWeatherCards from "../FutureWeatherCard/FutureWeatherCards";
import SearchBar from "../SearchBar/SearchBar";
import CitySimpleWeatherCards from "../CitySimpleWeatherCard/CitySimpleWeatherCards";
import fetchWeatherApi from '../../services/weatherApis';
import datafetchLocationSimpleWeatherApi from '../../services/weatherApis';
import { getMappedWeather } from "../weatherMappings";
import "./WeatherCard.css"

interface WeatherCardProps {
} 

const WeatherCard: React.FC<WeatherCardProps> = ()=>{
  const [city, setCity] = useState("Melbourne");
  const [CurrentWeatherData, setCurrentWeatherData] = useState<any>(null);
  const [FutureWeatherData, setFutureWeatherData] = useState<any>(null);
  const [LocationData, setLocationData] = useState<any>(null);
  const [TodayWeatherData, setTodayWeatherData] = useState<any>(null);

  const handleCity = (city: string): void=>{
    setCity(city);
  }

  useEffect(()=>{
    const fetchWeatherData = async (city: string)=>{
      try{
        const data = await fetchWeatherApi(city);
        if (data) {
          setTodayWeatherData(data.forecast.forecastday[0]);
          setFutureWeatherData(data.forecast);
          setLocationData(data.location);
          setCurrentWeatherData(data.current);
        }
      }catch(e){
        console.log(e);
      }
    }

    fetchWeatherData(city);
  }, [city]);

  if (!TodayWeatherData) {
    return <p>Loading weather data...</p>;
  }

  return(
    <div className="weather-page">
      <div className="weather-card">
        <CityWeatherCard 
        location= {LocationData.name}
        time= {""}
        current_temperature= {CurrentWeatherData.temp_c}
        temperature_range= {`${TodayWeatherData.day.mintemp_c} - ${TodayWeatherData.day.maxtemp_c}`}
        weather= {getMappedWeather(CurrentWeatherData.condition.text) || CurrentWeatherData.condition.text}
        humidity= {CurrentWeatherData.humidity}
        wind_speed= {CurrentWeatherData.wind_kph} 
        pm2_5= {CurrentWeatherData.air_quality.pm2_5}
        feelslike_temperature= {CurrentWeatherData.feelslike_c}
        />
      </div>
      <div className="weather-card-right">
        <FutureWeatherCards weatherData= {FutureWeatherData}/>
        <SearchBar handleCity= {handleCity}/>
        <CitySimpleWeatherCards handleCity= {handleCity}/>
      </div>
    </div>
  )
};

export default WeatherCard;
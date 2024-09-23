
import React, { useState, useEffect } from 'react';
import WeatherIcon from '../WeatherIcon/WeatherIcon';
import { getMappedWeather } from '../weatherMappings';
import "./CityWeatherCard.css"
interface CityWeatherCardProps {
  location: string,
  time: string,
  current_temperature: number,
  temperature_range: string,
  weather: string,
  humidity: number,
  pm2_5: number,
  wind_speed: number,
  feelslike_temperature: number
}

const CityWeatherCard: React.FC<CityWeatherCardProps> = (props) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false
    };    

    const formatted = date.toLocaleString('en-US', options);
    const [weekday, month, day, year, time] = formatted.replace(',', '').split(' ');
    return `${day} ${month}, ${weekday} ${time}`;
  };

  const weatherBackgrounds: { [key: string]: string } = {
    sunny: '/assets/background/Sunny_day_background.png',
    cloudy_day: '/assets/background/Cloudy_day_background.png',
    cloudy: '/assets/background/Cloudy_day_background.png',
    hail: '/assets/background/Hail_background.png',
    rain: '/assets/background/Rain_background.png',
    snow: '/assets/background/Snow_background.png'
  };

  return (
    <div className='city-weather-card' style={{backgroundImage: `url(${weatherBackgrounds[props.weather.toLowerCase()]})`}}>
      <div className="time-header">
        <div>{formatDate(currentTime)}</div>
      </div>
      <div className="location-name">{props.location}</div>
      <div className="temperature">
        <div className='current_temperature'>{props.current_temperature}{'\u00B0'}</div>
        <div className='temperature_range'>{props.temperature_range}</div>
      </div>
      <WeatherIcon weather= {getMappedWeather(props.weather)}/>
      <div className="other-weather-infos">
        <div> 
          <img src="./assets/meta_icon/humidity.svg" alt="humidity" />
          <div>{props.humidity}%</div>
        </div>
        <div>
          <img src="./assets/meta_icon/wind_speed.svg" alt="wind_speed" />
          <div>{props.wind_speed}km/h</div>
        </div>
        <div>
          <img src="./assets/meta_icon/PM2.5.svg" alt="PM2.5" />
          <div>{props.pm2_5}ug</div>
        </div>
        
        <div>
          <img src="./assets/meta_icon/Somatosensory_temperature.svg" alt="Somatosensory_temperature" />
          <div>{props.feelslike_temperature}{'\u00B0'}</div>
        </div>
        
      </div>
    </div>
  );
};

export default CityWeatherCard;
import React from "react";
import WeatherIcon from "../WeatherIcon/WeatherIcon";
import { mappedWeather, getMappedWeather } from "../weatherMappings";
import "./FutureWeatherCards.css"
interface WeatherData {

}

interface FutureWeatherCardsProps {

}

const mapped_weather: { [key: string]: string } = {
    'Partly cloudy': 'cloudy_day'
  }

const FutureWeatherCards: React.FC<any> = (weatherData)=>{
  const getWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return weekdays[date.getDay()];
  };

  return (
  <>
    <div className="future-weathercard">
      {weatherData.weatherData.forecastday.slice(1).map((data: any) => (
        <div className="sub-column" key= {getWeekday(data.date)}>
          <div className="weekday">{getWeekday(data.date)}</div>
          <div className="date">{data.date}</div>
          <WeatherIcon weather={getMappedWeather(data.day.condition.text) || data.day.condition.text}/>
          <div className="temperature_range">{`${data.day.mintemp_c} - ${data.day.maxtemp_c}°`}</div>
        </div>
      ))}
    </div>

  </>
  )
};

export default FutureWeatherCards;
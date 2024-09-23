import React from "react";
import './WeatherIcon.css'
interface WeatherIconProps {
  weather: string
} 

const WeatherIcon: React.FC<WeatherIconProps> = (props)=>{
  const current_weather = props.weather;

  let Icon;
  switch(current_weather){
    case 'sunny':
      Icon = <img src="./assets/weather_icon/Sunny.png" alt="Sunny" />;
      break;
    case 'cloudy_day':
      Icon = <img src="./assets/weather_icon/Cloudy_day.png" alt="Cloudy_day" />;
      break;
    case 'cloudy':
      Icon = <img src="./assets/weather_icon/Cloudy.png" alt="Cloudy" />;
      break;
    case 'hail':
      Icon = <img src="./assets/weather_icon/Hail.png" alt="Hail" />;
      break;
    case 'rain':
      Icon = <img src="./assets/weather_icon/Rain.png" alt="Rain" />;
      break;
    case 'snow':
      Icon = <img src="./assets/weather_icon/Snow.png" alt="Snow" />;
      break;
    default:
      Icon = <img src="./assets/weather_icon/Sunny.png" alt="Sunny" />;
  }

  return(
    <div className="weather-icon">
      {Icon}
    </div>  
  )
};

export default WeatherIcon;
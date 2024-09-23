import axios from "axios";

const fetchWeatherApi = async (city: string) => {
  const KEY = "8e9b3a54051449a083893833242209";
  const URL = `http://api.weatherapi.com/v1/forecast.json?key=${KEY}&q=${city}&days=5&aqi=yes&alerts=no`;
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.log("Error Message:", error);
  }
};

export default fetchWeatherApi;

import axios from "axios";
import { OPEN_WEATHER_MAP_API_KEY } from "./credentials.js";

async function getData(url) {
  try {
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error.message);
  }
}
export async function printCurrentWeather(cityName) {
  const OPEN_WEATHER_MAP_API =
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}` +
    `&appid=${OPEN_WEATHER_MAP_API_KEY}&units=metric&lang=ro`;

  const data = await getData(OPEN_WEATHER_MAP_API);
  console.log(
    `În ${data.name} se prognozează ${data.weather[0].description}.` +
      `\nTemperatura curentă este de ${data.main.temp}°C.` +
      `\nLong: ${data.coord.lon} Lat: ${data.coord.lat}`
  );
  return data.coord;
}
export async function printCurrentWeatherFor7Days(lat, long) {
  const OPEN_WEATHER_MAP_API =
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}` +
    `&appid=${OPEN_WEATHER_MAP_API_KEY}&units=metric&lang=ro`;

  const data = await getData(OPEN_WEATHER_MAP_API);
  console.log(data.daily.length);
}

import axios from "axios";
import { OPEN_WEATHER_MAP_API_KEY } from "./credentials.js";
import Table from "cli-table3";
import { DateTime } from "luxon";

async function getData(url) {
  try {
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error.message);
  }
}
/**
 *
 * @typeof {Object} Coords
 * @property (number)lat - geographical latitude
 * @property (number)lon- geographical longitude
 */
/**
 * Prints current weather conditions
 * @param {string} cityName name of city. optional "City,(State),Country".(Use ISO cod)
 * @returns(Coords) gepgraphical coordinates of the city
 */
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

/**
 * Prints weather for 8 days
 * @param {Coords} coords -- geographical coordinates of a location
 *
 */
export async function printCurrentWeatherFor7Days({ lat, lon }) {
  const OPEN_WEATHER_MAP_API =
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}` +
    `&appid=${OPEN_WEATHER_MAP_API_KEY}&units=metric&lang=ro`;

  const data = await getData(OPEN_WEATHER_MAP_API);
  let table = new Table({
    head: ["Data", "Temp max", "Temp min", "Viteza vantului"],
  });
  const dailyData = data.daily;
  //console.log(dailyData);
  dailyData.forEach((dayData) => {
    const date = DateTime.fromSeconds(dayData.dt)
      .setLocale("ro")
      .toLocaleString(DateTime.DATE_MED);

    const arr = [
      date,
      `${Math.round(dayData.temp.max)}°C.`,
      `${Math.round(dayData.temp.min)}°C.`,
      `${Math.round(dayData.wind_speed)}m/s`,
    ];
    table.push(arr);
  });
  console.log(table.toString());
}

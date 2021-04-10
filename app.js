import {
  printCurrentWeather,
  printCurrentWeatherFor7Days,
} from "./weatherAPI.js";
const city = process.argv[2];

const coords = printCurrentWeather(city);
printCurrentWeatherFor7Days(coords);

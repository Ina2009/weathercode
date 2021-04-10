import {
  printCurrentWeather,
  printCurrentWeatherFor7Days,
} from "./weatherAPI.js";
const city = process.argv[2];

const coords = await printCurrentWeather(city);

printCurrentWeatherFor7Days(coords);

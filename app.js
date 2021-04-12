import {
  printCurrentWeather,
  printCurrentWeatherFor7Days,
} from "./weatherAPI.js";
const city = process.argv[2];

const coords = await printCurrentWeather(city);
console.log(typeof coords);
printCurrentWeatherFor7Days(coords);

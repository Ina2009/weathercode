import axios from "axios";
//console.log(process.argv);
const city = process.argv[2];
async function printCurrentWeather(cityName) {
  const OPEN_WEATHER_MAP_API =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=6283374885c529df7c729538778fbfdd&units=metric&lang=ro";

  try {
    const response = await axios.get(OPEN_WEATHER_MAP_API);
    let data = response.data;
    console.log(`În ${data.name} se prognozează ${data.weather[0].description}. \n
    Temperatura curentă este de ${data.main.temp}°C.`);
  } catch (error) {
    console.log(error);
  }
}

printCurrentWeather(city);

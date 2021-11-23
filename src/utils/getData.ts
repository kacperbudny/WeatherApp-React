import { fetchMinimalWeather, fetchWeather, getCoordinates } from "./fetchData";
import { IWeather } from "./interfaces/weather";
import MinimalWeather from "./models/minimalWeather";
import WeatherFormatter from "./weatherFormatter";

export const getWeatherData = async (cityName: string): Promise<IWeather> => {
  const { lat, lon } = await getCoordinates(cityName);
  const result = await fetchWeather(lat, lon);
  const weatherData = await WeatherFormatter.formatWeather(result, cityName);

  return weatherData;
};

export const getMinimalWeatherData = async (
  cityName: string
): Promise<MinimalWeather> => {
  const { lat, lon } = await getCoordinates(cityName);
  const result = await fetchMinimalWeather(lat, lon);
  const minimalWeatherData = await WeatherFormatter.formatMinimalWeather(
    result,
    cityName
  );

  return minimalWeatherData;
};

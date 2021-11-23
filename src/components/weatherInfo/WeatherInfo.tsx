import React from "react";
import { IWeather } from "../../utils/interfaces/weather";
import CurrentWeather from "./CurrentWeather";
import WeatherDetails from "./WeatherDetails";

interface Props {
  weather: IWeather | undefined;
  isFavourite: boolean;
  toggleFavourite: () => void;
}

const WeatherInfo: React.FC<Props> = ({
  weather,
  isFavourite,
  toggleFavourite,
}) => {
  return (
    <main>
      <CurrentWeather
        weather={weather}
        isFavourite={isFavourite}
        toggleFavourite={toggleFavourite}
      />
      <WeatherDetails weather={weather} />
    </main>
  );
};

export default WeatherInfo;

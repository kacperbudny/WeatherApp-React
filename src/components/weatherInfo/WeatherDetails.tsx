import React from "react";
import { IWeather } from "../../utils/interfaces/weather";
import DetailsHeader from "./DetailsHeader";
import DetailsContent from "./DetailsContent";

interface Props {
  weather: IWeather | undefined;
}

const WeatherDetails: React.FC<Props> = ({ weather }) => {
  return (
    <div className="details">
      <DetailsHeader />
      <DetailsContent weather={weather} />
    </div>
  );
};

export default WeatherDetails;

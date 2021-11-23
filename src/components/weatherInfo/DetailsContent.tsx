import React from "react";
import { IWeather } from "../../utils/interfaces/weather";
import DetailsList from "./DetailsList";
import Graph from "./Graph";
import NextWeek from "./NextWeek";

interface Props {
  weather: IWeather | undefined;
}

const DetailsContent: React.FC<Props> = ({ weather }) => {
  return (
    <div id="details-content" className="active">
      <hr />
      <DetailsList weather={weather} />
      <Graph dataArray={weather?.hourlyWeatherArray} />
      <NextWeek weeklyWeather={weather?.weeklyWeatherArray} />
    </div>
  );
};

export default DetailsContent;

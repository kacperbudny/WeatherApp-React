import React from "react";
import { IWeather } from "../../utils/interfaces/weather";
import DetailsItem from "./DetailsItem";

interface Props {
  weather: IWeather | undefined;
}

const DetailsList: React.FC<Props> = ({ weather }) => {
  return (
    <ul className="details-flex-container">
      <DetailsItem
        header="Sensed temperature"
        value={weather?.sensedTemperature}
        unit=" &deg;C"
      />
      <DetailsItem header="Humidity" value={weather?.humidity} unit="%" />
      <DetailsItem header="Wind" value={weather?.wind} unit=" km/h" />
      <DetailsItem header="UV" value={weather?.uv} />
      <DetailsItem header="Pressure" value={weather?.pressure} unit=" hPa" />
    </ul>
  );
};

export default DetailsList;

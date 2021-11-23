import React from "react";
import { IWeeklyWeather } from "../../utils/interfaces/weather";

interface Props {
  weather: IWeeklyWeather;
}

function getDayName(timestamp: number, locale: string) {
  const date = new Date(timestamp);
  const dayName = date.toLocaleDateString(locale, { weekday: "long" });
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowName = tomorrow.toLocaleDateString(locale, { weekday: "long" });

  if (dayName === tomorrowName) return "Tomorrow";
  else return dayName;
}

const NextWeekItem: React.FC<Props> = ({ weather }) => {
  return (
    <li tabIndex={0}>
      <span className="day">{getDayName(weather.date * 1000, "en-US")}</span>
      <span className="icon-cell">
        <object
          type="image/svg+xml"
          className="weather-icon"
          data={weather.icon}
          tabIndex={-1}
          title={`${weather.description} icon`}
          aria-hidden="true"
        ></object>
      </span>
      <span className="weather-description">{weather.description}</span>
      <span
        className="max-temp"
        aria-label={`Maximum temperature ${weather.maxTemperature} degrees Celcius`}
      >
        {weather.maxTemperature} &deg;C
      </span>
      <span
        className="min-temp"
        aria-label={`Minimum temperature ${weather.minTemperature} degrees Celcius`}
      >
        {weather.minTemperature} &deg;C
      </span>
    </li>
  );
};

export default NextWeekItem;

import React from "react";
import { IWeeklyWeather } from "../../utils/interfaces/weather";
import NextWeekItem from "./NextWeekItem";

interface Props {
  weeklyWeather?: IWeeklyWeather[];
}

const NextWeek: React.FC<Props> = ({ weeklyWeather }) => {
  return (
    <div className="next-week">
      <h4 tabIndex={0}>Next week</h4>
      <ul className="next-week-list">
        {weeklyWeather?.map((weather) => (
          <NextWeekItem key={weather.date} weather={weather} />
        ))}
      </ul>
    </div>
  );
};

export default NextWeek;

import { IWeeklyWeather } from "../interfaces/weather";
import { getIcon } from "../icons";

interface IWeeklyWeatherArguments {
  minTemperature: number;
  maxTemperature: number;
  description: string;
  iconCode: string;
  date: number;
}

export default class WeeklyWeather implements IWeeklyWeather {
  minTemperature: number;
  maxTemperature: number;
  description: string;
  icon: string;
  date: number;

  constructor({
    minTemperature,
    maxTemperature,
    description,
    iconCode,
    date,
  }: IWeeklyWeatherArguments) {
    this.minTemperature = Math.round(minTemperature);
    this.maxTemperature = Math.round(maxTemperature);
    this.description = description;
    this.icon = getIcon(iconCode);
    this.date = date;
  }
}

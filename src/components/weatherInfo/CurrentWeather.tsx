import React from "react";
import { IWeather } from "../../utils/interfaces/weather";

interface Props {
  weather: IWeather | undefined;
  isFavourite: boolean;
  toggleFavourite: () => void;
}

const CurrentWeather: React.FC<Props> = ({
  weather,
  isFavourite,
  toggleFavourite,
}) => {
  return (
    <div className="current-weather" tabIndex={0}>
      <object
        type="image/svg+xml"
        id="current-icon"
        data={weather?.icon}
        tabIndex={-1}
        title={`${weather?.description} icon`}
        aria-hidden="true"
      ></object>
      <div className="city-info">
        <h2 id="city-name">{weather?.cityName}</h2>
        <p className="temperature">
          <span id="current-temperature">{weather?.temperature}</span> &deg;C
        </p>
        <p id="current-description">{weather?.description}</p>
      </div>
      <button
        className="favourites-icon"
        id="heart-button"
        onClick={toggleFavourite}
        aria-label={`${
          isFavourite ? "Remove from favourites" : "Add to favourites"
        }`}
      >
        <i
          className={`${isFavourite ? "fas" : "far"} fa-heart ${
            isFavourite && "full-heart"
          }`}
        ></i>
      </button>
    </div>
  );
};

export default CurrentWeather;

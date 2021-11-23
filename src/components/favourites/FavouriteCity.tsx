import React from "react";
import { useRef } from "react";
import { IFavouriteObject } from "../../utils/interfaces/favouriteObject";

interface Props {
  city: IFavouriteObject;
  onDelete: (cityName: string) => void;
  changeCity: (cityName: string) => void;
  closePanel: () => void;
}

const FavouriteCity: React.FC<Props> = ({
  city,
  onDelete,
  changeCity,
  closePanel,
}) => {
  const favouritesListRef = useRef<HTMLLIElement>(null);

  const handleClick = (event: React.MouseEvent) => {
    const item = (event.target as HTMLElement).closest(".favourite-item");
    if (!item) return;
    if (!favouritesListRef.current!.contains(item)) return;
    if (event.defaultPrevented) return;

    changeCity(city.cityName);
    closePanel();
  };

  return (
    <li
      className="favourite-item"
      onClick={handleClick}
      ref={favouritesListRef}
      tabIndex={0}
    >
      <div className="flex-group-left">
        <object
          type="image/svg+xml"
          className="icon"
          data={city.icon}
          tabIndex={-1}
        ></object>
        <div className="city-info" tabIndex={0}>
          <h4>{city.cityName}</h4>
          <p>{city.temperature} &deg;C</p>
          <p className="description">{city.weatherDescription}</p>
        </div>
      </div>
      <button
        className="remove-button"
        onClick={(event: React.MouseEvent) => {
          event.preventDefault();
          onDelete(city.cityName);
        }}
        tabIndex={0}
        aria-label="Remove from"
      >
        <i className="far fa-trash-alt"></i>
      </button>
    </li>
  );
};

export default FavouriteCity;

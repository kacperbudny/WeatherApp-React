import React from "react";
import FavouriteCity from "./FavouriteCity";
import { IFavouriteObject } from "../../utils/interfaces/favouriteObject";

interface Props {
  favourites: IFavouriteObject[];
  onDelete: (cityName: string) => void;
  changeCity: (cityName: string) => void;
  closePanel: () => void;
}

const FavouritesList: React.FC<Props> = ({
  favourites,
  onDelete,
  changeCity,
  closePanel,
}) => {
  return (
    <>
      {favourites.length > 0 ? (
        <ul id="favourites-list">
          {favourites.map((city) => (
            <FavouriteCity
              key={city.cityName}
              city={city}
              onDelete={onDelete}
              changeCity={changeCity}
              closePanel={closePanel}
            />
          ))}
        </ul>
      ) : (
        <p>Your list of favourites is empty.</p>
      )}
    </>
  );
};

export default FavouritesList;

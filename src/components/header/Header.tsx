import React from "react";
import OpenFavouritesButton from "./OpenFavouritesButton";
import SearchForm from "./SearchForm";

interface Props {
  changeCity: (cityName: string) => void;
  showFavouritesPanel: () => void;
  showNotification: (message: string) => void;
}

const Header: React.FC<Props> = ({
  changeCity,
  showFavouritesPanel,
  showNotification,
}) => {
  return (
    <header>
      <h1>WeatherApp</h1>
      <SearchForm changeCity={changeCity} showNotification={showNotification} />
      <OpenFavouritesButton showFavouritesPanel={showFavouritesPanel} />
    </header>
  );
};

export default Header;

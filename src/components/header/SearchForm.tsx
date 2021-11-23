import React from "react";
import { useState } from "react";

interface Props {
  changeCity: (cityName: string) => void;
  showNotification: (message: string) => void;
}

const SearchForm: React.FC<Props> = ({ changeCity, showNotification }) => {
  const [cityName, setCityName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cityName.trim()) {
      changeCity(cityName);
    } else {
      showNotification("You have to enter a city name.");
    }
    setCityName("");
  };

  return (
    <form id="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for a city..."
        name="search-input"
        id="search-input"
        autoComplete="off"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
      />
      <button type="submit" id="search-button" aria-label="Search">
        <i className="fas fa-search"></i>
      </button>
    </form>
  );
};

export default SearchForm;

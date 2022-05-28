import React, { useState, useEffect, useCallback } from "react";
import Header from "./components/header/Header";
import WeatherInfo from "./components/weatherInfo/WeatherInfo";
import Footer from "./components/footer/Footer";
import { IWeather } from "./utils/interfaces/weather";
import Loading from "./components/loading/Loading";
import Notification from "./components/notification/Notification";
import { IFavouriteObject } from "./utils/interfaces/favouriteObject";
import Favourites from "./components/favourites/Favourites";
import useOnUpdateEffect from "./hooks/useOnUpdateEffect";
import { getWeatherData } from "./utils/getData";
import {
  getFavouriteCitiesFromLocalStorage,
  saveFavouriteCitiesInStorage,
  saveInitialCityInStorage,
} from "./utils/localStorage";
import { getCityFromGeolocation } from "./utils/geolocation";

const App: React.FC = () => {
  const [weather, setWeather] = useState<IWeather>();
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [favouriteCities, setFavouriteCities] = useState<IFavouriteObject[]>(
    []
  );
  const [isFavourite, setIsFavourite] = useState(false);
  const [showFavouritePanel, setShowFavouritePanel] = useState(false);

  useEffect(() => {
    const updateWeather = async (cityName: string): Promise<void> => {
      try {
        setLoading(true);
        const result: IWeather = await getWeatherData(cityName);
        setWeather(result);
        saveInitialCityInStorage(cityName);
      } catch (error) {
        if (error instanceof TypeError) {
          showNotificationHandler("Unknown or incorrect city name.");
        } else {
          showNotificationHandler((error as Error).message);
        }
      } finally {
        setLoading(false);
      }
    };

    if (city.length < 1) return;

    updateWeather(city);
  }, [city]);

  useEffect(() => {
    const initialCity = localStorage.getItem("initialCity");

    if (!initialCity) {
      getCityFromGeolocation(
        (cityName) => {
          setCity(cityName);
        },
        () => {
          showNotificationHandler(
            "Could not get your location, please enter your city in the search bar."
          );
          setCity("London");
        }
      );
    } else {
      setCity(initialCity);
    }

    getFavouriteCitiesFromLocalStorage((favs) => {
      setFavouriteCities(favs);
    });
  }, []);

  const isCityInFavourites = useCallback(
    (cityName: string): boolean => {
      return favouriteCities.some((city) => city.cityName == cityName);
    },
    [favouriteCities]
  );

  useOnUpdateEffect(() => {
    setIsFavourite(isCityInFavourites(city));
    saveFavouriteCitiesInStorage(favouriteCities);
  }, [city, isCityInFavourites]);

  const changeCityHandler = (cityName: string) => {
    const cityNameStartingWithCapitalLetter =
      cityName.charAt(0).toUpperCase() + cityName.slice(1);
    setCity(cityNameStartingWithCapitalLetter);
  };

  const closeNotificationHandler = () => {
    setShowNotification(false);
    setNotificationMessage("");
  };

  const showNotificationHandler = (message: string) => {
    setShowNotification(true);
    setNotificationMessage(message);
  };

  const toggleFavouriteHandler = () => {
    if (isCityInFavourites(city)) {
      deleteFavouriteCityHandler(city);
    } else {
      addFavouriteCityHandler(weather!);
    }
  };

  const closeFavouritesPanelHandler = () => {
    setShowFavouritePanel(false);
  };

  const showFavouritesPanelHandler = () => {
    setShowFavouritePanel(true);
  };

  const addFavouriteCityHandler = (weather: IWeather) => {
    if (favouriteCities.length >= 5) {
      showNotificationHandler("You can have maximum of 5 favourite cities.");
      return;
    }

    const newFavouriteCity = {
      cityName: weather.cityName,
      icon: weather.icon,
      weatherDescription: weather.description,
      temperature: weather.temperature,
    };

    setFavouriteCities((prev) => [...prev, newFavouriteCity]);
  };

  const deleteFavouriteCityHandler = (cityName: string) => {
    setFavouriteCities((prev) =>
      prev.filter((city) => city.cityName !== cityName)
    );
  };

  return (
    <>
      <Header
        changeCity={changeCityHandler}
        showFavouritesPanel={showFavouritesPanelHandler}
        showNotification={showNotificationHandler}
      />
      <WeatherInfo
        weather={weather}
        isFavourite={isFavourite}
        toggleFavourite={toggleFavouriteHandler}
      />
      <Footer />
      {loading && <Loading />}
      {showNotification && (
        <Notification
          message={notificationMessage}
          onClose={closeNotificationHandler}
        />
      )}
      {showFavouritePanel && (
        <Favourites
          onClose={closeFavouritesPanelHandler}
          favourites={favouriteCities}
          onDelete={deleteFavouriteCityHandler}
          changeCity={changeCityHandler}
        />
      )}
    </>
  );
};

export default App;

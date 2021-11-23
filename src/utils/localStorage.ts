import { getMinimalWeatherData } from "./getData";
import { IFavouriteObject } from "./interfaces/favouriteObject";

export const saveInitialCityInStorage = (cityName: string) => {
  localStorage.setItem("initialCity", cityName);
};

export const saveFavouriteCitiesInStorage = (
  favouriteCities: IFavouriteObject[]
): void => {
  const cityNames = favouriteCities.map((city) => city.cityName);
  localStorage.setItem("cities", JSON.stringify(cityNames));
};

export const getFavouriteCitiesFromLocalStorage = async (
  callback: (favs: IFavouriteObject[]) => void
): Promise<void> => {
  const storedCityNames = localStorage.getItem("cities");

  if (storedCityNames) {
    const storedFavourites = JSON.parse(storedCityNames);

    const favouriteObjects = await getFavouriteObjectsFromNames(
      storedFavourites
    );

    callback(favouriteObjects);
  }
};

const getFavouriteObjectsFromNames = async (
  storedFavourites: string[]
): Promise<IFavouriteObject[]> => {
  const requests = storedFavourites.map((favourite: string) =>
    convertFavouriteCityToObject(favourite)
  );

  const responses: IFavouriteObject[] = await Promise.all(requests);

  return responses;
};

const convertFavouriteCityToObject = async (
  cityName: string
): Promise<IFavouriteObject> => {
  const result = await getMinimalWeatherData(cityName);
  return {
    icon: result.icon,
    cityName: result.cityName,
    weatherDescription: result.description,
    temperature: result.temperature,
  };
};

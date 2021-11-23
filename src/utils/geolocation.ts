import { getCityNameFromCoordinates } from "./fetchData";

export const getCityFromGeolocation = (
  successCallback: (cityName: string) => void,
  errorCallback: () => void
): void => {
  const success = (position: {
    coords: { latitude: number; longitude: number };
  }) => {
    const coordsObj = {
      lat: position.coords.latitude.toFixed(1),
      lon: position.coords.longitude.toFixed(1),
    };

    getCityNameFromCoordinates({
      lat: +coordsObj.lat,
      lon: +coordsObj.lon,
    }).then((cityName) => {
      successCallback(cityName);
    });
  };

  const error = () => {
    errorCallback();
  };

  const options = {
    enableHighAccuracy: false,
    maximumAge: 0,
    timeout: 27000,
  };

  if (!navigator.geolocation) {
    error();
  } else {
    navigator.geolocation.getCurrentPosition(success, error, options);
  }
};

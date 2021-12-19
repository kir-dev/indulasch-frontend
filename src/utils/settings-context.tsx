import { createContext, ReactNode, useState } from "react";

const DEFAULT_COORDINATES: Coordinates = {
  lat: 47.473443,
  lon: 19.052844,
};

const LocalStorageKeys = {
  LOCATION_ENABLED: "locationEnabled",
  WEATHER_BACKGROUND_ENABLED: "weatherBackgroundEnabled",
  STATIC_COORDS_LAT: "lat",
  STATIC_COORDS_LON: "lon",
  RADIUS: "radius",
  SCHPINCER_API_KEY: "schpincer_api_key",
};

export type Coordinates = {
  lat: number | string;
  lon: number | string;
};

function getCoordsFromLocalStorage(): Coordinates {
  let lat = localStorage.getItem(LocalStorageKeys.STATIC_COORDS_LAT);
  let lon = localStorage.getItem(LocalStorageKeys.STATIC_COORDS_LON);
  if (lat && lon) {
    return { lat: lat, lon: lon };
  } else return DEFAULT_COORDINATES;
}

export type SettingsContextType = {
  locationEnabled: boolean;
  setLocationEnabled: (enabled: boolean) => void;
  weatherBackgroundEnabled: boolean;
  setWeatherBackgroundEnabled: (enabled: boolean) => void;
  staticCoordinates: Coordinates;
  setStaticCoordinates: (coordinates: Coordinates) => void;
  radius: number;
  setRadius: (radius: number) => void;
  getLocation: () => Promise<Coordinates>;
  settingsOverlayVisible: boolean;
  setSettingsOverlayVisible: (visible: boolean) => void;
  kioskMode: boolean;
  schpincerApiKey: string;
  setSchpincerApiKey: (key: string) => void;
};

export const SettingsContext = createContext<SettingsContextType>({
  locationEnabled: !!localStorage.getItem(LocalStorageKeys.LOCATION_ENABLED),
  setLocationEnabled: () => {},
  weatherBackgroundEnabled: !!localStorage.getItem(
    LocalStorageKeys.WEATHER_BACKGROUND_ENABLED
  ),
  setWeatherBackgroundEnabled: () => {},
  staticCoordinates: getCoordsFromLocalStorage(),
  setStaticCoordinates: () => {},
  radius: 300,
  setRadius: () => {},
  getLocation: () => new Promise<Coordinates>((resolve, reject) => reject()),
  settingsOverlayVisible: false,
  setSettingsOverlayVisible: () => {},
  kioskMode: false,
  schpincerApiKey: "",
  setSchpincerApiKey: () => {},
});

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [locationEnabled, setLocationEnabledState] = useState<boolean>(
    localStorage.getItem(LocalStorageKeys.LOCATION_ENABLED) === "true"
  );

  const [weatherBackgroundEnabled, setWeatherBackgroundEnabledState] =
    useState<boolean>(
      localStorage.getItem(LocalStorageKeys.WEATHER_BACKGROUND_ENABLED) ===
        "true"
    );

  const [staticCoordinates, setStaticCoordinatesState] = useState<Coordinates>(
    getCoordsFromLocalStorage()
  );

  const [radius, setRadiusState] = useState<number>(
    parseInt(localStorage.getItem(LocalStorageKeys.RADIUS) || "300")
  );

  const [settingsOverlayVisible, setSettingsOverlayVisibleState] =
    useState<boolean>(false);

  const [kioskMode] = useState<boolean>(
    new URLSearchParams(window.location.search).get("mode") === "kiosk"
  );

  if (kioskMode) document.title = "induláSch - Kiosk";

  const [schpincerApiKey, setSchpincerApiKeyState] = useState<string>(
    localStorage.getItem(LocalStorageKeys.SCHPINCER_API_KEY) || ""
  );

  const setLocationEnabled = (enabled: boolean) => {
    getLocation()
      .then(() => {
        localStorage.setItem(LocalStorageKeys.LOCATION_ENABLED, enabled + "");
        setLocationEnabledState(enabled);
      })
      .catch(() => {
        localStorage.setItem(LocalStorageKeys.LOCATION_ENABLED, false + "");
        setLocationEnabledState(false);
      });
  };
  const setWeatherBackgroundEnabled = (enabled: boolean) => {
    localStorage.setItem(
      LocalStorageKeys.WEATHER_BACKGROUND_ENABLED,
      enabled + ""
    );
    setWeatherBackgroundEnabledState(enabled);
  };

  const setStaticCoordinates = (coordinates: Coordinates) => {
    localStorage.setItem(
      LocalStorageKeys.STATIC_COORDS_LAT,
      coordinates.lat + ""
    );
    localStorage.setItem(
      LocalStorageKeys.STATIC_COORDS_LON,
      coordinates.lon + ""
    );
    setStaticCoordinatesState(coordinates);
  };

  const setRadius = (radius: number) => {
    localStorage.setItem(LocalStorageKeys.RADIUS, radius + "");
    setRadiusState(radius);
  };

  const setSettingsOverlayVisible = (visible: boolean) => {
    setSettingsOverlayVisibleState(visible);
  };

  const setSchpincerApiKey = (key: string) => {
    localStorage.setItem(LocalStorageKeys.SCHPINCER_API_KEY, key);
    setSchpincerApiKeyState(key);
  };

  const getLocation = () => {
    return new Promise<Coordinates>((resolve, reject) => {
      if (locationEnabled) {
        navigator.geolocation.getCurrentPosition(
          async (geodata) => {
            if (geodata.coords.accuracy > 100) {
              reject("Pontatlan a helymeghatározás");
            }
            resolve({
              lat: geodata.coords.latitude,
              lon: geodata.coords.longitude,
            });
          },
          () => {
            setLocationEnabled(false);
            reject("Helymeghatározás nem sikerült, így ki lett kapcsolva.");
          }
        );
      } else {
        resolve(staticCoordinates);
      }
    });
  };

  return (
    <SettingsContext.Provider
      value={{
        locationEnabled: locationEnabled,
        setLocationEnabled: setLocationEnabled,
        weatherBackgroundEnabled: weatherBackgroundEnabled,
        setWeatherBackgroundEnabled: setWeatherBackgroundEnabled,
        staticCoordinates: staticCoordinates,
        setStaticCoordinates: setStaticCoordinates,
        radius: radius,
        setRadius: setRadius,
        getLocation: getLocation,
        settingsOverlayVisible: settingsOverlayVisible,
        setSettingsOverlayVisible: setSettingsOverlayVisible,
        kioskMode: kioskMode,
        schpincerApiKey: schpincerApiKey,
        setSchpincerApiKey: setSchpincerApiKey,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

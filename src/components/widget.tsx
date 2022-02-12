import styled from "styled-components";
import { getBubiData, NextBikePlace } from "../utils/nextbike";
import { Bicycle } from "@styled-icons/bootstrap/Bicycle";
import "weather-react-icons/lib/css/weather-icons.css";
import { WeatherIcon } from "weather-react-icons";
import { colors } from "../theme/theme";
import { useContext, useEffect, useState } from "react";
import {
  SettingsContext,
  SettingsContextType,
} from "../utils/settings-context";
import { getSchPincerOpenings, SchPincerOpening } from "../utils/schpincer";
import { getWeatherData, Weather } from "../utils/weather";
import { useInterval } from "../utils/use-interval";

const Widget = styled.div`
  box-sizing: border-box;
  border-radius: 20px;
  background-color: white;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${colors.theme};
  @media (prefers-color-scheme: dark) {
    background-color: ${colors.darkGray};
    color: ${colors.darkTheme};
    svg {
      fill: ${colors.darkTheme};
    }
  }
`;

export const WidgetArea = styled.div<{
  $kioskMode?: boolean;
  heightRestriction?: number;
}>`
  ${({ heightRestriction }) =>
    heightRestriction &&
    `max-height:${window.innerHeight - heightRestriction}px;`}
  width: 100%;
  overflow: auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  padding-bottom: 20px;
  box-sizing: border-box;
  @media screen and (max-width: 1200px) {
    padding-top: 20px;
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

export function BubiWidget() {
  const [bubi, setBubi] = useState<NextBikePlace | undefined>();
  const [error, setError] = useState<string | undefined>();
  const { getLocation } = useContext<SettingsContextType>(SettingsContext);
  // Function to call every 10s and in the beginning
  const bubiApiCall = () => {
    getLocation().then((coords) => {
      getBubiData({
        lat: parseFloat(coords.lat + ""),
        lon: parseFloat(coords.lon + ""),
      })
        .then((response) => {
          setBubi(response);
          setError(undefined);
        })
        .catch((error) => {
          setError(error.toString());
        });
    });
  };
  // Interval for 10s and initial API call
  useInterval(() => {
    bubiApiCall();
  }, 10000);
  // Initial API call
  useEffect(() => {
    bubiApiCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // If the widget is not working due to some error, hide it.
  if (error) {
    return null;
  }
  return (
    <Widget>
      <StyledBicycle />
      <WidgetText>
        {bubi?.bikes_available_to_rent || "?"} / {bubi?.bike_racks || "?"}
      </WidgetText>
      <WidgetDescription>{bubi?.name}</WidgetDescription>
    </Widget>
  );
}

export function SchPincerWidget() {
  const { kioskMode, schpincerApiKey } =
    useContext<SettingsContextType>(SettingsContext);
  const [openings, setOpenings] = useState<SchPincerOpening[]>([]);
  const [shownIndex, setShownIndex] = useState<number>(0);
  const [error, setError] = useState<string | undefined>();
  const openingsApiCall = () => {
    getSchPincerOpenings(schpincerApiKey)
      .then((newOpenings) => {
        setOpenings(newOpenings);
        setError(undefined);
      })
      .catch((error) => {
        setError(error.toString());
      });
  };
  // Interval for 10s and initial API call
  useInterval(() => {
    if (kioskMode) {
      openingsApiCall();
      setShownIndex(shownIndex + 1 >= openings.length ? 0 : shownIndex + 1);
    }
  }, 10000);
  // Initial API call
  useEffect(() => {
    if (kioskMode) {
      openingsApiCall();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // If the widget is not working due to some error, hide it.
  if (
    error ||
    !kioskMode ||
    !Array.isArray(openings) ||
    openings.length === 0 ||
    schpincerApiKey === ""
  ) {
    return null;
  }
  return (
    <Widget>
      <WidgetText>{openings[shownIndex]?.name || "Ismeretlen"}</WidgetText>
      <WidgetText>
        {openings[shownIndex]?.available.toString() || "?"} /{" "}
        {openings[shownIndex]?.outOf.toString() || "?"}
      </WidgetText>
      <WidgetDescription>{openings[shownIndex]?.comment}</WidgetDescription>
    </Widget>
  );
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<Weather>();
  const [error, setError] = useState<string | undefined>();
  const { getLocation } = useContext<SettingsContextType>(SettingsContext);
  const weatherApiCall = () => {
    getLocation()
      .then((coords) => {
        getWeatherData(coords)
          .then((openings) => {
            setWeather(openings);
            setError(undefined);
          })
          .catch((error) => {
            setError(error.toString());
          });
      })
      .catch((error) => setError(error.toString()));
  };
  // Interval for 10s and initial API call
  useInterval(() => {
    weatherApiCall();
  }, 30000);
  useEffect(() => {
    weatherApiCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!weather?.main.temp || error) {
    return null;
  }
  return (
    <Widget>
      <StyledWeather
        iconId={weather?.weather?.[0].id || 800}
        name="owm"
        night={
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
        }
      />
      <WidgetText>
        {Math.round(weather.main.temp) - 273}°
        {(weather.snow || weather.rain) &&
          ` | ${weather.snow?.["1h"] || weather.rain?.["1h"] || 0}mm`}
      </WidgetText>
    </Widget>
  );
}

const StyledBicycle = styled(Bicycle)`
  height: 120px;
  fill: ${colors.theme};
`;

const StyledWeather = styled(WeatherIcon)`
  height: 120px;
  font-size: 100px;
  fill: ${colors.theme};
`;

const WidgetText = styled.h2`
  font-size: 50px;
  margin: 0;
`;

const WidgetDescription = styled.h2`
  font-style: italic;
`;

import { useWeather } from "../../utils/useWeather";
import { Widget, WidgetText } from "./widget";
import styled from "styled-components";
import { WeatherIcon } from "weather-react-icons";
import "weather-react-icons/lib/css/weather-icons.css";
import { colors } from "../../theme/theme";
import { Mist } from "@styled-icons/remix-fill/Mist";

export function WeatherWidget() {
  const { weather, error } = useWeather();

  if (!weather?.main.temp || error) {
    return null;
  }
  return (
    <Widget>
      {weather?.weather?.[0].id &&
      weather.weather[0].id < 800 &&
      weather.weather[0].id >= 700 ? (
        <StyledMist />
      ) : (
        <StyledWeather
          iconId={weather?.weather?.[0].id || 800}
          name="owm"
          night={
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
          }
        />
      )}
      <WidgetText>
        {Math.round(weather.main.temp) - 273}°
        {(weather.snow || weather.rain) &&
          ` | ${weather.snow?.["1h"] || weather.rain?.["1h"] || 0}mm`}
      </WidgetText>
    </Widget>
  );
}

const StyledWeather = styled(WeatherIcon)`
  height: 120px;
  font-size: 100px;
  fill: ${colors.theme};
`;

const StyledMist = styled(Mist)`
  height: 120px;
  font-size: 100px;
  fill: ${colors.theme};
`;

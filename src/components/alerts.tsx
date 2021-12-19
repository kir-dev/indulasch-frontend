import { RefObject, useContext, useEffect, useState } from "react";
import { Alert } from "../utils/types";
import {
  SettingsContext,
  SettingsContextType,
} from "../utils/settings-context";
import { getAlerts } from "../utils/api";
import styled from "styled-components";
import { colors } from "../theme/theme";
import { LineElement, LineNumber, LineText } from "./field";
import { AlertIcon } from "./icons";
import { useTimeout } from "../utils/use-timeout";

export function AlertsDisplay({ ref }: { ref: RefObject<HTMLDivElement> }) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [alertIndex, setAlertIndex] = useState<number>(0);
  const [error, setError] = useState<string | undefined>();
  const { radius, getLocation, locationEnabled, kioskMode } =
    useContext<SettingsContextType>(SettingsContext);
  const alertApiCall = () => {
    setAlertIndex(0);
    getLocation()
      .then((coords) => {
        getAlerts(coords, radius)
          .then((response) => {
            setError(undefined);
            setAlerts(response.alerts);
          })
          .catch((error) => {
            setError(error.toString());
          });
      })
      .catch((err) => {
        setError(err.toString());
      });
  };
  useEffect(() => {
    if (kioskMode) alertApiCall();
  }, [locationEnabled]);

  let alert = alerts[alertIndex];
  let duration = alert?.description.length / 50;
  useTimeout(
    () => {
      if (kioskMode) {
        if (alertIndex >= alerts.length) {
          alertApiCall();
        } else {
          setAlertIndex(alertIndex + 1);
        }
      }
    },
    alert ? duration * 1000 : 10
  );

  if (!kioskMode || error || alerts.length === 0 || !alert) return null;

  return (
    <AlertWrapper ref={ref}>
      <LineElement>
        <AlertIcon />
        <LineNumber
          $backgroundColor={alert.routes[0].color}
          $circle={alert.routes[0].icon.type !== "BOX"}
        >
          <LineText $color={alert.routes[0].icon.textColor}>
            {alert.routes[0].icon.text}
          </LineText>
        </LineNumber>
      </LineElement>
      <ScrollingTextContainer $duration={duration} key={Date.now()}>
        <h1>{alert.description}</h1>
      </ScrollingTextContainer>
    </AlertWrapper>
  );
}

const AlertWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  border-radius: 20px;
  background-color: white;
  padding: 10px;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  margin: 20px 0;
  @media (prefers-color-scheme: dark) {
    background-color: ${colors.darkGray};
  }
`;

const ScrollingTextContainer = styled.div<{ $duration: number }>`
  overflow: hidden;
  width: 100%;
  h1{
    white-space: nowrap;
    padding-left: 100%;
    animation: scroll ${({ $duration }) => $duration}s linear running;
    -webkit-animation: scroll ${({ $duration }) => $duration}s linear running;
    -moz-animation: scroll ${({ $duration }) => $duration}s linear running;
    display: inline-block;
    @media (prefers-color-scheme: dark){
      color: white;
    }
  }
  @-moz-keyframes scroll {
    from { -moz-transform: translateX(0); }
    to { -moz-transform: translateX(-100%); }
  }

  /* for Chrome */
  @-webkit-keyframes scroll {
    from { -webkit-transform: translateX(0); }
    to { -webkit-transform: translateX(-100%); }
  }

  @keyframes scroll {
    from {
      -moz-transform: translateX(0);
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    to {
      -moz-transform: translateX(-100%);
      -webkit-transform: translateX(-100%);
      transform: translateX(-100%);
    }
`;

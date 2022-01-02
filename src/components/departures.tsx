import React, { useContext, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Departure } from "../utils/types";
import { Field } from "./field";
import { getDepartures } from "../utils/api";
import {
  SettingsContext,
  SettingsContextType,
} from "../utils/settings-context";
import { useInterval } from "../utils/use-interval";

export function Departures({
  heightRestriction,
}: {
  heightRestriction: number;
}) {
  const fieldHeight = 120;
  const departuresWrapperHeight = window.innerHeight - heightRestriction;
  const [departures, setDepartures] = useState<Departure[]>([]);
  const [error, setError] = useState<string | undefined>();
  const { radius, getLocation, locationEnabled, kioskMode } =
    useContext<SettingsContextType>(SettingsContext);
  let rowLimit = useMemo<number>(() => {
    return kioskMode
      ? Math.floor(departuresWrapperHeight / fieldHeight)
      : Infinity;
  }, [kioskMode, departuresWrapperHeight]);

  const bkkApiCall = () => {
    getLocation()
      .then((coords) => {
        getDepartures(coords, radius)
          .then((response) => {
            setError(undefined);
            setDepartures(response.departures);
          })
          .catch((error) => {
            setError(error.toString());
          });
      })
      .catch((err) => {
        setError(err.toString());
      });
  };
  useInterval(() => {
    bkkApiCall();
  }, 10000);
  useEffect(() => {
    bkkApiCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationEnabled]);

  if (error) {
    return (
      <DeparturesWrapper
        $height={rowLimit * fieldHeight}
        $isFixedHeight={kioskMode}
      >
        <h1>
          <i>Hiba történt</i>
        </h1>
      </DeparturesWrapper>
    );
  }
  if (departures.length === 0) {
    return (
      <DeparturesWrapper
        $height={rowLimit * fieldHeight}
        $isFixedHeight={kioskMode}
      >
        <NoDepartureContainer>
          <h1>
            <i>Nincs indulás</i>
          </h1>
        </NoDepartureContainer>
      </DeparturesWrapper>
    );
  }
  return (
    <DeparturesWrapper
      $height={departuresWrapperHeight}
      $isFixedHeight={kioskMode}
    >
      {departures.slice(0, rowLimit).map((departure, index) => (
        <Field key={index} departure={departure} />
      ))}
    </DeparturesWrapper>
  );
}

const NoDepartureContainer = styled.div`
  height: 60vh;
  max-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DeparturesWrapper = styled.div<{
  $height: number;
  $isFixedHeight?: boolean;
}>`
  ${({ $isFixedHeight, $height }) => $isFixedHeight && `height: ${$height}px;`};
  min-height: ${({ $height }) => `${$height}px;`};
  width: 100%;
  overflow: auto;
  display: block;
  text-align: center;
  padding-top: 100px;
  box-sizing: border-box;
  @media (prefers-color-scheme: dark) {
    color: white;
  }
`;

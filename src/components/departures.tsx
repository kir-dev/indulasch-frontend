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
  const fieldHeight = 100;
  const departuresWrapperHeight = window.innerHeight - heightRestriction;
  console.log(departuresWrapperHeight);
  const [departures, setDepartures] = useState<Departure[]>([]);
  const [error, setError] = useState<string | undefined>();
  const { radius, getLocation, locationEnabled, kioskMode } =
    useContext<SettingsContextType>(SettingsContext);
  let rowLimit = useMemo<number>(() => {
    return kioskMode
      ? Math.floor(departuresWrapperHeight / fieldHeight)
      : Infinity;
  }, [kioskMode, departuresWrapperHeight]);
  console.log(rowLimit);

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
      <DeparturesWrapper $height={rowLimit * fieldHeight}>
        <NoDepartureContainer>
          <h1>
            <i>Hiba történt</i>
          </h1>
        </NoDepartureContainer>
      </DeparturesWrapper>
    );
  }
  if (departures.length === 0) {
    return (
      <DeparturesWrapper $height={rowLimit * fieldHeight}>
        <NoDepartureContainer>
          <h1>
            <i>Nincs indulás</i>
          </h1>
        </NoDepartureContainer>
      </DeparturesWrapper>
    );
  }
  return (
    <DeparturesWrapper $height={departuresWrapperHeight}>
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
}>`
  height: ${({ $height }) => `${$height}px;`};
  width: 100%;
  overflow: auto;
  display: block;
  text-align: center;
  box-sizing: border-box;
  @media (prefers-color-scheme: dark) {
    color: white;
  }
`;

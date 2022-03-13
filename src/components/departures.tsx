import React, { useMemo } from "react";
import styled from "styled-components";
import { Field } from "./field";
import { useDepartures } from "../utils/useDepartures";
import { useSettingsContext } from "../utils/settings-context";

export function Departures({
  heightRestriction,
}: {
  heightRestriction: number;
}) {
  const fieldHeight = 100;
  const departuresWrapperHeight = window.innerHeight - heightRestriction;
  const { departures, error } = useDepartures();
  const { kioskMode } = useSettingsContext();
  let rowLimit = useMemo<number>(() => {
    return kioskMode
      ? Math.floor(departuresWrapperHeight / fieldHeight)
      : Infinity;
  }, [kioskMode, departuresWrapperHeight]);

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

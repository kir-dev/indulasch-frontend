import React from "react";
import styled from "styled-components";
import { Field } from "./field";
import { useDepartures } from "../utils/useDepartures";

export function Departures() {
  const { departures, error } = useDepartures();
  // const { kioskMode } = useSettingsContext();
  if (error || departures.length === 0) {
    return (
      <DeparturesWrapper>
        <NoDepartureContainer>
          <h1>
            <i>{error ? "Hiba történt" : "Nincs indulás"}</i>
          </h1>
        </NoDepartureContainer>
      </DeparturesWrapper>
    );
  }
  return (
    <DeparturesWrapper>
      {departures.map((departure, index) => (
        <Field key={index} departure={departure} />
      ))}
    </DeparturesWrapper>
  );
}

const NoDepartureContainer = styled.div`
  max-height: 100%;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const DeparturesWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  flex: 1 1;
  flex-direction: column;
  flex-flow: column wrap;
  text-align: center;
  box-sizing: border-box;
  @media (prefers-color-scheme: dark) {
    color: white;
  }
`;

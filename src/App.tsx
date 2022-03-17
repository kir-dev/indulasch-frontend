import React, { createRef, useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "./theme/theme";
import { TitleBar } from "./components/titlebar";
import { WidgetArea } from "./components/widgets/widget";
import { Departures } from "./components/departures";
import { Settings } from "./components/settings";
import { Footer } from "./components/footer";
import { BubiWidget } from "./components/widgets/bubiWidget";
import { WeatherWidget } from "./components/widgets/weatherWidget";
import { SchPincerWidget } from "./components/widgets/schPincerWidget";
import { Messages } from "./components/messages";

function App() {
  const [titleBarHeight, setTitleBarHeight] = useState<number>(0);
  const [footerHeight, setFooterHeight] = useState<number>(0);
  const [widgetHeight, setWidgetHeight] = useState<number>(0);
  const titleBarRef = createRef<HTMLDivElement>();
  const footerRef = createRef<HTMLDivElement>();
  const widgetRef = createRef<HTMLDivElement>();
  useEffect(() => {
    if (titleBarRef?.current) {
      setTitleBarHeight(titleBarRef.current.offsetHeight);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [titleBarRef?.current?.offsetHeight]);
  useEffect(() => {
    if (footerRef?.current) {
      setFooterHeight(footerRef.current.offsetHeight);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [footerRef?.current?.offsetHeight]);
  useEffect(() => {
    if (footerRef?.current) {
      setFooterHeight(footerRef.current.offsetHeight);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [footerRef?.current?.offsetHeight]);
  useEffect(() => {
    if (widgetRef?.current) {
      setWidgetHeight(widgetRef.current.offsetHeight);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widgetRef?.current?.offsetHeight]);
  return (
    <AppWrapper>
      <TitleBar titleBarRef={titleBarRef} />
      <Settings />
      <ContentContainer
        height={window.innerHeight - titleBarHeight - footerHeight}
      >
        <DepartureAndMessagesContainer
          height={
            window.innerHeight - titleBarHeight - footerHeight - widgetHeight
          }
        >
          <Messages />
          <Departures />
        </DepartureAndMessagesContainer>
        <WidgetArea ref={widgetRef}>
          <BubiWidget />
          <WeatherWidget />
          <SchPincerWidget />
        </WidgetArea>
      </ContentContainer>
      <Footer footerRef={footerRef} />
    </AppWrapper>
  );
}

export const AppWrapper = styled.div`
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  background-color: ${colors.background};
  h1 {
    font-size: 30px;
    text-align: center;
    margin: 0;
  }
  @media (prefers-color-scheme: dark) {
    background-color: black;
  }
`;

const DepartureAndMessagesContainer = styled.div<{ height: number }>`
  height: ${({ height }) => `${height}px`};
  max-width: 100%;
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div<{ height: number }>`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 20px;
  grid-template-rows: 100%;
  width: 90%;
  height: ${({ height }) => `${height}px`};
  margin: 0 auto;
  padding-top: 100px;
  overflow: auto;
  @media screen and (max-width: 1500px) {
    display: block;
  }
`;

export default App;

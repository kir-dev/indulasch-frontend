import React, { createRef, useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "./theme/theme";
import { TitleBar } from "./components/titlebar";
import {
  BubiWidget,
  SchPincerWidget,
  WeatherWidget,
  WidgetArea,
} from "./components/widget";
import { SettingsProvider } from "./utils/settings-context";
import { Departures } from "./components/departures";
import { Settings } from "./components/settings";
import { Footer } from "./components/footer";
// import { AlertsDisplay } from "./components/alerts";

function App() {
  const [titleBarHeight, setTitleBarHeight] = useState<number>(0);
  const [widgetAreaHeight, setWidgetAreaHeight] = useState<number>(0);
  const [footerHeight, setFooterHeight] = useState<number>(0);
  // const [alertDisplayHeight, setAlertDisplayHeight] = useState<number>(0);
  const widgetRef = createRef<HTMLDivElement>();
  const titleBarRef = createRef<HTMLDivElement>();
  const footerRef = createRef<HTMLDivElement>();
  // const alertsDisplayRef = createRef<HTMLDivElement>();
  useEffect(() => {
    if (titleBarRef?.current) {
      setTitleBarHeight(titleBarRef.current.offsetHeight);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [titleBarRef?.current?.offsetHeight]);
  useEffect(() => {
    if (widgetRef?.current) {
      setWidgetAreaHeight(widgetRef.current.offsetHeight);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widgetRef?.current?.offsetHeight]);
  useEffect(() => {
    if (footerRef?.current) {
      setFooterHeight(footerRef.current.offsetHeight);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [footerRef?.current?.offsetHeight]);
  // useEffect(() => {
  //   if (alertsDisplayRef?.current) {
  //     setAlertDisplayHeight(alertsDisplayRef.current.offsetHeight);
  //   }
  // //eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [alertsDisplayRef?.current?.offsetHeight]);
  return (
    <AppWrapper>
      <SettingsProvider>
        <TitleBar titleBarRef={titleBarRef} />
        <Settings />
        <MarginContainer>
          <Departures
            heightRestriction={
              (titleBarHeight || 0) +
              (widgetAreaHeight || 0) +
              (footerHeight || 0)
            }
          />
          {/*<AlertsDisplay ref={alertsDisplayRef} />*/}
          <WidgetArea ref={widgetRef}>
            <BubiWidget />
            <WeatherWidget />
            <SchPincerWidget />
          </WidgetArea>
        </MarginContainer>
        <Footer footerRef={footerRef} />
      </SettingsProvider>
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  min-height: 100vh;
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

const MarginContainer = styled.div`
  width: 90%;
  margin: 0 auto;
`;

export default App;

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
  const [widgetAreaHeight, setWidgetAreaHeight] = useState<number>(0);
  const [footerHeight, setFooterHeight] = useState<number>(0);
  const [messagesHeight, setMessagesHeight] = useState<number>(0);
  const widgetRef = createRef<HTMLDivElement>();
  const titleBarRef = createRef<HTMLDivElement>();
  const footerRef = createRef<HTMLDivElement>();
  const messagesRef = createRef<HTMLDivElement>();
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
  useEffect(() => {
    if (messagesRef?.current) {
      setMessagesHeight(messagesRef.current.offsetHeight);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messagesRef?.current?.offsetHeight]);
  console.log(messagesHeight);
  return (
    <AppWrapper>
      <TitleBar titleBarRef={titleBarRef} />
      <Settings />
      <ContentContainer>
        <DepartureAndMessagesContainer
          heightRestriction={
            (titleBarHeight || 0) +
            ((window.innerWidth < 1200 && widgetAreaHeight) || 0) +
            (footerHeight || 0)
          }
        >
          <Departures
            heightRestriction={
              (titleBarHeight || 0) +
              ((window.innerWidth < 1200 && widgetAreaHeight) || 0) +
              (footerHeight || 0) +
              (messagesHeight || 0)
            }
          />
          <Messages messagesRef={messagesRef} />
        </DepartureAndMessagesContainer>
        <WidgetArea
          ref={widgetRef}
          heightRestriction={
            window.innerWidth > 1200
              ? (titleBarHeight || 0) + (footerHeight || 0)
              : undefined
          }
        >
          <BubiWidget />
          <WeatherWidget />
          <SchPincerWidget />
        </WidgetArea>
      </ContentContainer>
      <Footer footerRef={footerRef} />
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

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-column-gap: 20px;
  width: 90%;
  margin: 0 auto;
  padding-top: 100px;
  @media screen and (max-width: 1200px) {
    display: block;
  }
`;

const DepartureAndMessagesContainer = styled.div<{ heightRestriction: number }>`
  height: ${({ heightRestriction }) =>
    `${window.innerHeight - heightRestriction}px;`};
  max-width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export default App;

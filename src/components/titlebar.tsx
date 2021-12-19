import styled from "styled-components";
import { colors } from "../theme/theme";
import { LocationIcon, Logo, SettingsIcon } from "./icons";
import { RefObject, useContext } from "react";
import {
  SettingsContext,
  SettingsContextType,
} from "../utils/settings-context";
import { Clock } from "./clock";

export function TitleBar({
  titleBarRef,
}: {
  titleBarRef: RefObject<HTMLDivElement>;
}) {
  const { locationEnabled, kioskMode } =
    useContext<SettingsContextType>(SettingsContext);
  return (
    <TitleBarWrapper ref={titleBarRef}>
      <TitleBarContent>
        <Logo />
        <TitleBarField>
          {locationEnabled && <LocationIcon />}
          {!kioskMode && <SettingsIcon />}
          {kioskMode && <Clock />}
        </TitleBarField>
      </TitleBarContent>
    </TitleBarWrapper>
  );
}

const TitleBarWrapper = styled.div`
  z-index: 10;
  width: 100%;
  height: 100px;
  position: fixed;
  background-color: ${colors.glassBeige};
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  @media (prefers-color-scheme: dark) {
    background-color: ${colors.glassBlack};
  }
`;

const TitleBarContent = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

const TitleBarField = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

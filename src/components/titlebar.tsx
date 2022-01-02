import styled from "styled-components";
import { colors } from "../theme/theme";
import { LocationIcon, Logo, SettingsIcon } from "./icons";
import { RefObject, useContext } from "react";
import {
  SettingsContext,
  SettingsContextType,
} from "../utils/settings-context";
import { Clock } from "./clock";
import { BarContent, BarField } from "./barElements";

export function TitleBar({
  titleBarRef,
}: {
  titleBarRef: RefObject<HTMLDivElement>;
}) {
  const { locationEnabled, kioskMode } =
    useContext<SettingsContextType>(SettingsContext);
  return (
    <TitleBarWrapper ref={titleBarRef}>
      <BarContent>
        <Logo />
        <BarField>
          {locationEnabled && <LocationIcon />}
          {!kioskMode && <SettingsIcon />}
          {kioskMode && <Clock />}
        </BarField>
      </BarContent>
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

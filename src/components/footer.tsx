import styled from "styled-components";
import { BarContent, BarField } from "./barElements";
import { ReactComponent as TrolleybusIcon } from "../assets/icons/trolleybus.svg";
import { ReactComponent as LogoImage } from "../assets/icons/logo.svg";
import { colors } from "../theme/theme";
import { RefObject } from "react";

export function Footer({
  footerRef,
}: {
  footerRef: RefObject<HTMLDivElement>;
}) {
  return (
    <FooterWrapper ref={footerRef}>
      <FooterContent>
        <BarField>
          <LogoWrapper /> &copy; 2022.
        </BarField>
        <BarField>
          Made with <TrolleybusIcon /> by
          <a href="https://kir-dev.sch.bme.hu" target="_blank" rel="noreferrer">
            Kir-Dev
          </a>
        </BarField>
        <BarField>UI v{process.env.REACT_APP_VERSION}</BarField>
      </FooterContent>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.footer`
  width: 100%;
  font-size: 30px;
  svg {
    height: 30px;
  }
  svg,
  a {
    margin: 0 10px;
  }
  a {
    appearance: none;
    color: black;
  }
  @media (prefers-color-scheme: dark) {
    color: white;
    a {
      color: white;
    }
  }
`;

const LogoWrapper = styled(LogoImage)`
  @media (prefers-color-scheme: dark) {
    color: white;
    path {
      fill: ${colors.darkTheme};
    }
  }
`;

const FooterContent = styled(BarContent)`
  padding: 10px 0;
  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
`;

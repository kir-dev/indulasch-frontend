import styled from "styled-components";
import { colors } from "../../theme/theme";

export const Widget = styled.div`
  box-sizing: border-box;
  border-radius: 20px;
  background-color: white;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${colors.theme};
  @media (prefers-color-scheme: dark) {
    background-color: ${colors.darkGray};
    color: ${colors.darkTheme};
    svg {
      fill: ${colors.darkTheme};
    }
  }
`;

export const WidgetArea = styled.div<{
  $kioskMode?: boolean;
  heightRestriction?: number;
}>`
  ${({ heightRestriction }) =>
    heightRestriction &&
    `max-height:${window.innerHeight - heightRestriction}px;`}
  width: 100%;
  overflow: auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  padding-bottom: 20px;
  box-sizing: border-box;
  @media screen and (max-width: 1200px) {
    padding-top: 20px;
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

export const WidgetText = styled.h2`
  font-size: 50px;
  margin: 0;
`;

export const WidgetDescription = styled.h2`
  font-style: italic;
`;

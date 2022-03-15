import { useState } from "react";
import { useInterval } from "../utils/useInterval";
import styled from "styled-components";
import { colors } from "../theme/theme";

export function Clock() {
  const [time, setTime] = useState<Date>(new Date());
  useInterval(() => {
    setTime(new Date());
  }, 1000);
  return (
    <ClockWrapper>
      <span className="grayed">{time.toLocaleDateString("hu-Hu")}</span>{" "}
      {time.toLocaleTimeString()}
    </ClockWrapper>
  );
}

const ClockWrapper = styled.p`
  font-size: 50px;
  @media (prefers-color-scheme: dark) {
    color: ${colors.darkTheme};
  }
  span.grayed {
    color: gray;
  }
`;

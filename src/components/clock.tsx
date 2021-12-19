import { useState } from "react";
import { useInterval } from "../utils/use-interval";
import styled from "styled-components";

export function Clock() {
  const [time, setTime] = useState<Date>(new Date());
  useInterval(() => {
    setTime(new Date());
  }, 1000);
  return <ClockWrapper>{time.toLocaleTimeString()}</ClockWrapper>;
}

const ClockWrapper = styled.p`
  font-size: 50px;
`;

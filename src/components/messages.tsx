import styled from "styled-components";
import { colors } from "../theme/theme";
import { MessageType, useMessages } from "../utils/useMessages";
import { RefObject, useState } from "react";
import { useTimeout } from "../utils/useTimeout";
import { useSettingsContext } from "../utils/settings-context";
import { InfoCircle } from "@styled-icons/fa-solid/InfoCircle";
import { CheckmarkCircle, Warning } from "@styled-icons/fluentui-system-filled";
import { HomeSmile } from "@styled-icons/boxicons-solid/HomeSmile";

export function Messages({
  messagesRef,
}: {
  messagesRef: RefObject<HTMLDivElement>;
}) {
  const { messages, error } = useMessages();
  const { kioskMode } = useSettingsContext();
  const [messageIndex, setMessageIndex] = useState<number>(0);
  let message = messages?.[messageIndex];
  let duration =
    (message?.text.length * 10 + (messagesRef.current?.offsetWidth || 1000)) /
    200;
  let icon = <InfoIcon />;
  switch (message?.type) {
    case MessageType.WARNING:
      icon = <WarningIcon />;
      break;
    case MessageType.SUCCESS:
      icon = <SuccessIcon />;
      break;
    case MessageType.FUN:
      icon = <FunIcon />;
      break;
  }
  useTimeout(
    () => {
      if (kioskMode && messages) {
        if (messageIndex >= messages.length) {
          setMessageIndex(0);
        } else {
          setMessageIndex(messageIndex + 1);
        }
      }
    },
    duration * 1000,
    messageIndex
  );
  if (!!error || !messages || messages.length === 0 || !kioskMode) return null;
  return (
    <MessagesWrapper ref={messagesRef} key={message?.id}>
      {icon}
      <ScrollingTextContainer $duration={duration}>
        <h1>{message?.text}</h1>
      </ScrollingTextContainer>
    </MessagesWrapper>
  );
}

const MessagesWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  border-radius: 20px;
  background-color: white;
  padding: 10px;
  display: grid;
  grid-column-gap: 10px;
  grid-template-columns: 60px calc(100% - 60px);
  flex-wrap: nowrap;
  margin: 20px 0;
  @media (prefers-color-scheme: dark) {
    background-color: ${colors.darkGray};
  }
`;

const InfoIcon = styled(InfoCircle)`
  color: dodgerblue;
  height: 60px;
  width: auto;
`;

const WarningIcon = styled(Warning)`
  color: orange;
  height: 60px;
  width: auto;
`;

const SuccessIcon = styled(CheckmarkCircle)`
  color: limegreen;
  height: 60px;
  width: auto;
`;

const FunIcon = styled(HomeSmile)`
  color: #52155a;
  height: 60px;
  width: auto;
`;

const ScrollingTextContainer = styled.div<{ $duration: number }>`
  overflow: hidden;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  h1{
    white-space: nowrap;
    padding-left: 100%;
    width: fit-content;
    animation: scroll ${({ $duration }) => $duration}s linear running;
    -webkit-animation: scroll ${({ $duration }) => $duration}s linear running;
    -moz-animation: scroll ${({ $duration }) => $duration}s linear running;
    display: inline-block;
    @media (prefers-color-scheme: dark){
      color: white;
    }
  }
  @-moz-keyframes scroll {
    from { -moz-transform: translateX(0); }
    to { -moz-transform: translateX(-100%); }
  }

  /* for Chrome */
  @-webkit-keyframes scroll {
    from { -webkit-transform: translateX(0); }
    to { -webkit-transform: translateX(-100%); }
  }

  @keyframes scroll {
    from {
      -moz-transform: translateX(0);
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    to {
      -moz-transform: translateX(-100%);
      -webkit-transform: translateX(-100%);
      transform: translateX(-100%);
    }
`;

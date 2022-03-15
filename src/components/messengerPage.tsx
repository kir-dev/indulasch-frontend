import { AppWrapper } from "../App";
import { BarContent } from "./barElements";
import { Logo } from "./icons";
import styled from "styled-components";
import { Message, MessageType, useMessages } from "../utils/useMessages";
import { MessageComponent } from "./messages";
import { TrashAlt } from "@styled-icons/fa-solid/TrashAlt";
import { colors } from "../theme/theme";
import { useMessageEdit } from "../utils/useMessageEdit";
import { Button, ButtonKinds, ErrorText, TextField } from "./settings";
import { useForm } from "react-hook-form";
import { useSettingsContext } from "../utils/settings-context";

export function MessengerPage() {
  const { messages, loading, update } = useMessages();
  const { remove, create, error } = useMessageEdit();
  const messageForm = useForm<Message>();
  const { messengerPassword, setMessengerPassword } = useSettingsContext();
  const passwordForm = useForm<{ password: string }>({
    defaultValues: { password: messengerPassword },
  });
  if (loading) return null;
  return (
    <AppWrapper>
      <Titlebar>
        <Logo />
        <PageTitle>Messenger</PageTitle>
      </Titlebar>
      <Center>
        <h1>Aktív üzenetek</h1>
        <MessagesContainer>
          {messages.map((m) => (
            <>
              <MessageComponent
                message={m}
                duration={(m.text.length * 10 + 1000) / 200}
              />
              <Center>
                <Trash
                  onClick={() => {
                    remove(m.id, update);
                  }}
                />
              </Center>
            </>
          ))}
        </MessagesContainer>
        <MessageForm
          onSubmit={messageForm.handleSubmit((values) => {
            create(values, update);
          })}
        >
          <Select {...messageForm.register("type")}>
            <option value={MessageType.INFO}>Infó</option>
            <option value={MessageType.WARNING}>Figyelmeztetés</option>
            <option value={MessageType.SUCCESS}>Pipa</option>
            <option value={MessageType.FUN}>Móka</option>
          </Select>
          <TextField style={{ flex: 1 }} {...messageForm.register("text")} />
          <Button type="submit" $kind={ButtonKinds.PRIMARY}>
            Hozzáadás
          </Button>
        </MessageForm>
        <MessageForm
          onSubmit={passwordForm.handleSubmit((values) => {
            setMessengerPassword(values.password);
          })}
        >
          <h3>Jelszó:</h3>
          <TextField
            style={{ flex: 1 }}
            {...passwordForm.register("password")}
          />
          <Button type="submit" $kind={ButtonKinds.PRIMARY}>
            Mentés
          </Button>
        </MessageForm>
        {error && <ErrorText>{error.toString()}</ErrorText>}
      </Center>
    </AppWrapper>
  );
}

const MessageForm = styled.form`
  display: flex;
  align-items: center;
  width: 90%;
  margin-top: 50px;
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
  @media (prefers-color-scheme: dark) {
    color: white;
  }
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const Trash = styled(TrashAlt)`
  height: 40px;
  color: ${colors.red};
  cursor: pointer;
`;

const MessagesContainer = styled.div`
  grid-gap: 20px;
  display: grid;
  grid-template-columns: auto 60px;
  width: 90%;
  margin: 0 auto;
  > * {
    margin: 0;
  }
`;

const PageTitle = styled.h1`
  font-style: italic;
  color: black;
  @media (prefers-color-scheme: dark) {
    color: white;
  }
`;

const Titlebar = styled(BarContent)`
  padding-top: 20px;
  padding-bottom: 20px;
  height: auto;
`;

const Select = styled.select`
  -webkit-appearance: none;
  border-radius: 20px;
  padding: 10px;
  font-size: large;
  margin: 10px;
  border: 1px solid gray;
`;

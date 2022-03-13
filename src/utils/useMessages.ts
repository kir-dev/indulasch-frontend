import axios from "axios";
import { useEffect, useState } from "react";
import Configuration from "./configuration";
import { useInterval } from "./useInterval";

export function useMessages() {
  const [messages, setMessages] = useState<MessageWithId[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const update = () => {
    setLoading(true);
    axios
      .get<MessageWithId[]>(Configuration.BACKEND_URL + "/messages")
      .then((res) => {
        setMessages(res.data);
        setError(undefined);
      })
      .catch(() => {
        setError("Lekérés hiba.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(update, []);

  useInterval(update, 30000);

  return { messages, loading, error, update };
}

export enum MessageType {
  INFO = "INFO",
  WARNING = "WARNING",
  SUCCESS = "SUCCESS",
  FUN = "FUN",
}

export type Message = {
  text: string;
  type: MessageType;
};

export type MessageWithId = {
  id: number;
} & Message;

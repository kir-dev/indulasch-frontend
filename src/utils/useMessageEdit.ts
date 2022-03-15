import axios from "axios";
import { useState } from "react";
import Configuration from "./configuration";
import { Message } from "./useMessages";
import { useSettingsContext } from "./settings-context";

export function useMessageEdit() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const { messengerPassword } = useSettingsContext();
  const create = (message: Message, callback: () => void) => {
    setLoading(true);
    axios
      .put(Configuration.BACKEND_URL + "/messages", message, {
        headers: { Authorization: `Bearer ${messengerPassword}` },
      })
      .then(() => {
        setError(undefined);
        callback();
      })
      .catch((err) => {
        setError(err.response.data.error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const remove = (id: number, callback: () => void) => {
    setLoading(true);
    axios
      .delete(Configuration.BACKEND_URL + "/messages/" + id, {
        headers: { Authorization: `Bearer ${messengerPassword}` },
      })
      .then(() => {
        setError(undefined);
        callback();
      })
      .catch((err) => {
        setError(err.response.data.error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return { create, remove, loading, error };
}

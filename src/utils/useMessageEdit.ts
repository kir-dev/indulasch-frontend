import axios from "axios";
import { useState } from "react";
import Configuration from "./configuration";
import { Message } from "./useMessages";

export function useMessageEdit() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const create = (message: Message, callback: () => void) => {
    setLoading(true);
    axios
      .put(Configuration.BACKEND_URL + "/messages", message)
      .then(() => {
        setError(undefined);
        callback();
      })
      .catch(() => {
        setError("Létrehozási hiba.");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const remove = (id: number, callback: () => void) => {
    setLoading(true);
    axios
      .delete(Configuration.BACKEND_URL + "/messages/" + id)
      .then(() => {
        setError(undefined);
        callback();
      })
      .catch(() => {
        setError("Létrehozási hiba.");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return { create, remove, loading, error };
}

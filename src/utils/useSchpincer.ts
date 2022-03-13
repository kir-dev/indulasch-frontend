import { useEffect, useMemo, useState } from "react";
import { useSettingsContext } from "./settings-context";
import axios from "axios";
import { useInterval } from "./useInterval";
import Configuration from "./configuration";

export function useSchpincer() {
  const [openings, setOpenings] = useState<SchPincerOpening[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const { schpincerApiKey } = useSettingsContext();
  const apiUrl = useMemo(() => {
    let url = new URL(Configuration.SCHPINCER_URL);
    url.searchParams.set("token", schpincerApiKey);
    return url;
  }, [schpincerApiKey]);
  const update = () => {
    setLoading(true);
    axios
      .get<SchPincerOpening[]>(apiUrl.toString())
      .then((res) => {
        setOpenings(res.data);
        setError(undefined);
      })
      .catch(() => {
        setError("Lekérés hiba.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(update, [apiUrl]);
  useInterval(update, 10000);

  return { openings, loading, error, update };
}

export type SchPincerOpening = {
  name: String;
  icon: String | undefined;
  feeling: String;
  available: number;
  outOf: number;
  banner: String | undefined;
  day: String;
  comment: String;
};

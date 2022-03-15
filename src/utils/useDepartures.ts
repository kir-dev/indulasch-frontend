import { ApiResponse, Departure } from "./types";
import { useSettingsContext } from "./settings-context";
import axios from "axios";
import { useEffect, useState } from "react";
import { useInterval } from "./useInterval";
import Configuration from "./configuration";

export function useDepartures() {
  const [departures, setDepartures] = useState<Departure[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const { getLocation, radius } = useSettingsContext();
  const update = () => {
    setLoading(true);
    getLocation()
      .then((coords) => {
        axios
          .post<ApiResponse>(Configuration.BACKEND_URL, {
            lat: coords.lat,
            lon: coords.lon,
            radius: radius,
          })
          .then((res) => {
            setDepartures(res.data.departures);
            setError(undefined);
          })
          .catch(() => {
            setError("Lekérés hiba.");
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch(() => {
        setError("Lokáció hiba.");
      });
  };

  useEffect(update, [getLocation, radius]);
  useInterval(update, 10000);

  return { departures, loading, error, update };
}

export function getSchPincerOpenings(key: string) {
  const url = new URL(process.env.REACT_APP_SCHPINCER_URL || "");
  url.searchParams.set("token", key);
  return new Promise(
    (resolve: (values: SchPincerOpening[]) => void, reject) => {
      if (key === "") reject("Nincs API kulcs!");
      fetch(url.toString())
        .then(async (response) => {
          if (response.status === 200) return response.json();
          reject(await response.text());
        })
        .then((data) => {
          resolve(data);
        })
        .catch((e) => {
          reject(e);
        });
    }
  );
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

import { useSettingsContext } from "../../utils/settings-context";
import { useState } from "react";
import { useSchpincer } from "../../utils/useSchpincer";
import { useInterval } from "../../utils/useInterval";
import { Widget, WidgetDescription, WidgetText } from "./widget";

export function SchPincerWidget() {
  const { kioskMode } = useSettingsContext();
  const [shownIndex, setShownIndex] = useState<number>(0);
  const { openings, error } = useSchpincer();
  useInterval(() => {
    if (kioskMode && openings) {
      setShownIndex(shownIndex + 1 >= openings?.length ? 0 : shownIndex + 1);
    }
  }, 10000);
  if (
    error ||
    !kioskMode ||
    !Array.isArray(openings) ||
    openings.length === 0
  ) {
    return null;
  }
  return (
    <Widget>
      <WidgetText>{openings[shownIndex]?.name || "Ismeretlen"}</WidgetText>
      <WidgetText>
        {openings[shownIndex]?.available.toString() || "?"} /{" "}
        {openings[shownIndex]?.outOf.toString() || "?"}
      </WidgetText>
      <WidgetDescription>{openings[shownIndex]?.comment}</WidgetDescription>
    </Widget>
  );
}

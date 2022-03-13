import { useNextbike } from "../../utils/useNextbike";
import styled from "styled-components";
import { Bicycle } from "@styled-icons/bootstrap/Bicycle";
import { colors } from "../../theme/theme";
import { Widget, WidgetDescription, WidgetText } from "./widget";

export function BubiWidget() {
  const { nearest, error } = useNextbike();
  if (error) {
    return null;
  }
  return (
    <Widget>
      <StyledBicycle />
      <WidgetText>
        {nearest?.bikes_available_to_rent || "?"} / {nearest?.bike_racks || "?"}
      </WidgetText>
      <WidgetDescription>{nearest?.name}</WidgetDescription>
    </Widget>
  );
}

const StyledBicycle = styled(Bicycle)`
  height: 120px;
  fill: ${colors.theme};
`;

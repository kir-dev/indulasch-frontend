import { useContext } from "react";
import {
  SettingsContext,
  SettingsContextType,
} from "../utils/settings-context";
import styled from "styled-components";
import { colors } from "../theme/theme";
import { useForm } from "react-hook-form";

type SettingsForm = {
  lat: string | number;
  lon: string | number;
  radius: number;
  schpincerApiKey: string;
};

enum ButtonKinds {
  PRIMARY = "primary",
  PRIMARY_DANGER = "primaryDanger",
  SECONDARY = "secondary",
  SECONDARY_DANGER = "secondaryDanger",
}

export function Settings() {
  const {
    locationEnabled,
    setLocationEnabled,
    staticCoordinates,
    setStaticCoordinates,
    radius,
    setRadius,
    settingsOverlayVisible,
    setSettingsOverlayVisible,
    schpincerApiKey,
    setSchpincerApiKey,
    kioskMode,
  } = useContext<SettingsContextType>(SettingsContext);
  const defaultValues = {
    lat: staticCoordinates.lat,
    lon: staticCoordinates.lon,
    radius: radius,
    schpincerApiKey: schpincerApiKey,
  };
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<SettingsForm>({
    defaultValues: defaultValues,
  });
  const saveSettings = (values: SettingsForm) => {
    try {
      const newLat = parseFloat(
        values.lat.toString() || staticCoordinates.lat.toString()
      );
      const newLon = parseFloat(
        values.lon.toString() || staticCoordinates.lon.toString()
      );
      if (!locationEnabled) {
        setStaticCoordinates({ lat: newLat, lon: newLon });
      }
    } catch (e) {
      if (!locationEnabled) {
        setStaticCoordinates({
          lat: staticCoordinates.lat,
          lon: staticCoordinates.lon,
        });
      }
    }
    try {
      const newRadius = parseInt(values.radius.toString() || radius.toString());
      setRadius(newRadius);
    } catch (e) {
      setRadius(radius);
    }
    setSchpincerApiKey(values.schpincerApiKey);
    setSettingsOverlayVisible(false);
  };
  if (!settingsOverlayVisible) return null;
  return (
    <SettingsWrapper
      id="settingsOverlay"
      onClick={(e) => {
        if (e.target === document.getElementById("settingsOverlay"))
          setSettingsOverlayVisible(false);
      }}
    >
      <SettingsPanelWrapper>
        <h1>Beállítások</h1>
        <h3>Helymeghatározás</h3>
        <CheckBox checked={locationEnabled} onChange={setLocationEnabled} />
        <i>Kapcsolók állításakor a beállítás azonnal megtörténik!</i>
        <StyledForm onSubmit={handleSubmit(saveSettings)}>
          <h3>Statikus szélességi fok</h3>
          <TextField
            disabled={locationEnabled}
            {...register("lat", {
              pattern: { value: /\d+[.,]\d+$/, message: "Rossz formátum" },
            })}
          />
          {errors.lat && <ErrorText>{errors.lat?.message}</ErrorText>}
          <h3>Statikus hosszúsági fok</h3>
          <TextField
            disabled={locationEnabled}
            {...register("lon", {
              pattern: { value: /\d+[.,]\d+$/, message: "Rossz formátum" },
            })}
          />
          {errors.lon && <ErrorText>{errors.lon?.message}</ErrorText>}
          <h3>Hatósugár (m)</h3>
          <TextField
            type="number"
            {...register("radius", {
              pattern: { value: /\d+$/, message: "Rossz formátum" },
            })}
          />
          {errors.radius && <ErrorText>{errors.radius?.message}</ErrorText>}
          {kioskMode && (
            <>
              <h3>SchPincér API kulcs</h3>
              <TextField {...register("schpincerApiKey")} />
              {errors.radius && (
                <ErrorText>{errors.schpincerApiKey?.message}</ErrorText>
              )}
            </>
          )}

          <ButtonGroup>
            <Button $kind={ButtonKinds.PRIMARY} type="submit">
              Mentés
            </Button>
            <Button
              $kind={ButtonKinds.SECONDARY_DANGER}
              onClick={() => {
                reset(defaultValues);
                setSettingsOverlayVisible(false);
              }}
            >
              Mégse
            </Button>
          </ButtonGroup>
        </StyledForm>
      </SettingsPanelWrapper>
    </SettingsWrapper>
  );
}

const SettingsWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 20;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SettingsPanelWrapper = styled.div`
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 500px;
  max-height: 90%;
  border-radius: 20px;
  background-color: white;
  overflow: auto;
  @media (prefers-color-scheme: dark) {
    background-color: ${colors.darkGray};
    color: white;
  }
`;

function CheckBox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <CheckBoxWrapper
      checked={checked}
      onChange={(e) => {
        onChange(e.target.checked);
      }}
      type="checkbox"
    />
  );
}

const CheckBoxWrapper = styled.input`
  &[type="checkbox"]{
    position: relative;
    min-width: 50px;
    max-width: 50px;
    min-height: 50px;
    max-height: 50px;
    color: black;
    border: 1px solid gray;
    border-radius: 300px;
    appearance: none;
    -webkit-appearance: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: background 175ms cubic-bezier(0.1, 0.1, 0.25, 1);
 }
  ::before {
    position: absolute;
    content: '';
    display: block;
    width: 7px;
    height: 20px;
    border-style: solid;
    border-color: white;
    border-width: 0 4px 4px 0;
    transform: rotate(45deg);
    @media (prefers-color-scheme: dark) {
      border-color: ${colors.darkGray};
    }
  }
  :checked {
    color: white;
    border-color: ${colors.theme};
    background: ${colors.theme};
    @media (prefers-color-scheme: dark) {
      border-color: ${colors.darkTheme};
      background-color: ${colors.darkTheme};
    }
`;

const Button = styled.button<{ $kind?: ButtonKinds }>`
  -webkit-appearance: none;
  border: none;
  cursor: pointer;
  border-radius: 20px;
  color: ${({ $kind }) => {
    switch ($kind) {
      case ButtonKinds.PRIMARY:
        return "white";
      case ButtonKinds.PRIMARY_DANGER:
        return "white";
      case ButtonKinds.SECONDARY:
        return "dodgetblue";
      case ButtonKinds.SECONDARY_DANGER:
        return "red";
      default:
        return "black";
    }
  }};
  background-color: ${({ $kind }) => {
    switch ($kind) {
      case ButtonKinds.PRIMARY:
        return "dodgerblue";
      case ButtonKinds.PRIMARY_DANGER:
        return "red";
      default:
        return "transparent";
    }
  }};
  ${({ $kind }) => {
    switch ($kind) {
      case ButtonKinds.SECONDARY:
        return "border-color: dodgerblue";
      case ButtonKinds.SECONDARY_DANGER:
        return "border-color: red";
      default:
        return;
    }
  }};
  ${({ $kind }) =>
    $kind ===
      (ButtonKinds.SECONDARY_DANGER || $kind === ButtonKinds.SECONDARY) &&
    "border-width: 2px; border-style: solid;"}
  padding: 20px 36px;
  font-size: large;
  margin: 10px;
  transition: all 0.2s;
  :hover {
    transform: scale(1.05);
  }
`;

const TextField = styled.input`
  -webkit-appearance: none;
  border-radius: 20px;
  width: 300px;
  padding: 10px;
  font-size: large;
  margin: 10px;
  border: 1px solid gray;
`;

const ErrorText = styled.p`
  color: ${colors.red};
  font-weight: bolder;
`;

const ButtonGroup = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 20px 0;
`;

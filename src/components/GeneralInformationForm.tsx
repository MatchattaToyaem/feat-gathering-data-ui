import React from "react";
import {
  IonRow,
  IonInput,
  IonCol,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonText,
} from "@ionic/react";
import { IManualElementValue } from "../utils/interfaces/IManualElementValue";
import Segment from "./Segment";
import { LEFT } from "../utils/constants/FootSide";
const decamelize = require("decamelize");

interface IProps {
  handleChangeInput(
    footSide: string | undefined,
    value: string,
    component: string
  ): void;
  manualElementValue: IManualElementValue;
}
const GeneralInformationForm: React.FC<IProps> = (props) => {
  const [side, setSide] = React.useState(LEFT);
  const [size, setSize] = React.useState<any>(props.manualElementValue.shoeSize ? props.manualElementValue.shoeSize : undefined);
  const [gender, setGender] = React.useState<any>(props.manualElementValue.gender ? props.manualElementValue.gender : undefined);

  const onSetSize = (value: any) => {
    if (value) {
      setSize(value);
    }
  };

  const onSetGender = (value: any) => {
    if (value) {
      setGender(value);
    }
  };
  const shoesSize = [];
  for (var femaleSize = 4; femaleSize <= 12; femaleSize += 0.5) {
    shoesSize.push(femaleSize);
  }
  for (var maleSize = 13; maleSize <= 16; maleSize += 1) {
    shoesSize.push(maleSize);
  }

  const displayValueOfElement = (element: string) => {
    if(element ==="idFromNSTDA"){
      return props.manualElementValue.idFromNSTDA
    }
    return (props.manualElementValue as any)[side][element];
  };

  const onSelectSegment = (value: string) => {
    setSide(value);
  };
  return (
    <>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel>
              NSTDA Id :
            </IonLabel>
            <IonInput
              type="number"
              inputMode="numeric"
              placeholder="0"
              value={displayValueOfElement("idFromNSTDA")}
              onIonInput={(e: any) => {
                props.handleChangeInput(undefined, e.target.value, "idFromNSTDA");
              }}
            />
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel>Gender</IonLabel>
            <IonSelect
              placeholder="Select gender"
              onIonChange={(e) => {
                onSetGender(e.detail.value);
                props.handleChangeInput(undefined, e.detail.value, "gender");
              }}
              value={gender}
            >
              <IonSelectOption value="f">Female</IonSelectOption>
              <IonSelectOption value="m">Male</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel>Shoes size (US)</IonLabel>
            <IonSelect
              placeholder="Select shoes size"
              onIonChange={(e) => {
                onSetSize(e.detail.value);
                props.handleChangeInput(undefined, e.detail.value, "shoeSize");
              }}
              value={size}
            >
              {shoesSize.map((size) => {
                return <IonSelectOption value={size}>{size}</IonSelectOption>;
              })}
            </IonSelect>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <Segment currentValue={side} onSelectSegment={onSelectSegment} />
        </IonCol>
      </IonRow>
      {Object.keys((props.manualElementValue as any).left).map(
        (key, _index) => {
          const label = decamelize(key, " ");
          return (
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel>
                    {side.charAt(0).toUpperCase() + side.slice(1)} {label} :
                  </IonLabel>
                  <IonInput
                    type="number"
                    inputMode="numeric"
                    placeholder="0.0"
                    value={displayValueOfElement(key)}
                    onIonInput={(e: any) => {
                      props.handleChangeInput(side, e.target.value, key);
                    }}
                  />
                  cm
                </IonItem>
              </IonCol>
            </IonRow>
          );
        }
      )}
    </>
  );
};

export default GeneralInformationForm;

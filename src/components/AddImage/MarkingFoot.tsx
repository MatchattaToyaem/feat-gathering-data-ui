import React, { useEffect } from "react";
import {
  IonCol,
  IonSelect,
  IonSelectOption,
  IonRow,
  IonGrid,
  IonProgressBar,
  IonIcon,
  IonAlert,
} from "@ionic/react";
import { feetComponent } from "../../utils/FeetComponent";
import FootCanvas from "./FootCanvas";
import {
  checkmarkCircleOutline,
  informationCircleOutline,
} from "ionicons/icons";

interface IProps {
  image: string;
  markPointHandler(
    footComponent: { x: number; y: number },
    component: string
  ): void;
  footComponent: any;
  containerRect: DOMRect;
}

const MarkingFoot: React.FC<IProps> = (props) => {
  const initialComponent =
    Object.keys(props.footComponent).length > 2 ? "fore" : "ankleSprain";

  const [footComponent, setFootComponent] = React.useState<string>(
    initialComponent
  );
  const [remainingComponent, setRemainingComponent] = React.useState<any[]>(
    Object.keys(
      Object.fromEntries(
        Object.entries(props.footComponent).filter(
          ([, value]) => (value as any).x === 0 && (value as any).y === 0
        )
      )
    )
  );

  const [showInformation, setShowInformation] = React.useState<boolean>(false);

  useEffect(() => {
    const remainingKey = Object.keys(
      Object.fromEntries(
        Object.entries(props.footComponent).filter(
          ([, value]) => (value as any).x === 0 && (value as any).y === 0
        )
      )
    );
    setRemainingComponent(remainingKey);
  }, [props]);

  const markPointHandler = (x: number, y: number) => {
    const updatedFootComponent = { x, y };
    props.markPointHandler(updatedFootComponent, footComponent);
  };

  const image = new Image();
  if (props.image) {
    image.src = props.image;
  }
  const imageLanscapeScaleRatio = props.containerRect.width / image.width;
  const imagePortraitScaleRatio =
    (props.containerRect.height - 100) / image.height;
  const imageScaleRatio: number =
    image.width > image.height
      ? imageLanscapeScaleRatio
      : imagePortraitScaleRatio;

  const renderSelectOption = () => {
    if (Object.keys(props.footComponent).length > 2) {
      return (
        <>
          {Object.entries(feetComponent).map(([key, value]) => {
            if (key !== "ankleSprain") {
              return (
                <IonSelectOption key={key} value={key}>
                  {value}
                </IonSelectOption>
              );
            }
            return <></>;
          })}
        </>
      );
    } else {
      return (
        <IonSelectOption value="ankleSprain">Ankle sprain</IonSelectOption>
      );
    }
  };

  const numberOfRemainingComponent =
    Object.keys(props.footComponent).length - 1 - remainingComponent.length;

  return (
    <>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonSelect
              value={footComponent}
              placeholder="Select component"
              onIonChange={(e) => {
                setFootComponent(e.detail.value);
              }}
            >
              {renderSelectOption()}
            </IonSelect>
          </IonCol>
        </IonRow>
        <IonRow class="ion-align-items-center">
          <IonCol size="11">
            <IonProgressBar
              value={
                numberOfRemainingComponent /
                (Object.keys(props.footComponent).length - 1)
              }
              color={
                numberOfRemainingComponent ===
                Object.keys(props.footComponent).length - 1
                  ? "success"
                  : "primary"
              }
            />
          </IonCol>
          <IonCol size="1">
            {numberOfRemainingComponent ===
            Object.keys(props.footComponent).length - 1 ? (
              <IonIcon icon={checkmarkCircleOutline} color="success" />
            ) : (
              <IonIcon
                icon={informationCircleOutline}
                onClick={() => {
                  setShowInformation(true);
                }}
              />
            )}
          </IonCol>
        </IonRow>
      </IonGrid>

      <IonAlert
        isOpen={showInformation}
        onDidDismiss={() => {
          setShowInformation(false);
        }}
        header={"Remaining mark"}
        message={remainingComponent
          .map((value) => {
            return " " + value;
          })
          .toString()}
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
          },
          {
            text: "Ok",
          },
        ]}
      />
      {props.footComponent.image && (
        <FootCanvas
          imageScaleRatio={imageScaleRatio}
          image={image}
          imageHeight={image.height * imageScaleRatio}
          imageWidth={image.width * imageScaleRatio}
          componentMarkerPosition={(props.footComponent as any)[footComponent]}
          onClick={markPointHandler}
        />
      )}
    </>
  );
};

export default MarkingFoot;

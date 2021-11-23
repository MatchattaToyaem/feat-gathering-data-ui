import React from "react";
import {
  IonLabel,
  IonModal,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonSegment,
  IonSegmentButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";
import ShowIamge from "./ShowImage";
const toSpaceCase = require("to-space-case");

interface IProps {
  onClose: Function;
  result: any;
  show: boolean;
}

const VolunteerDetail: React.FC<IProps> = (props) => {
  const [footSide, setFootSide] = React.useState("leftFoot");
  const [showImage, setShowImage] = React.useState(false);
  const [image, setImage] = React.useState<any>("");
  const foot = props.result ? (props.result as any)[footSide] : {};
  const gender = props.result?.gender;
  const onClose = () => {
    setShowImage(false);
    setImage("");
  };
  return (
    <IonModal
      isOpen={props.show}
      swipeToClose={true}
      onDidDismiss={() => props.onClose()}
    >
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Detail</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonSegment
              value={footSide}
              onIonChange={(e) => {
                if (e.detail.value) {
                  setFootSide(e.detail.value);
                }
              }}
            >
              <IonSegmentButton value="leftFoot">
                <IonLabel>Left foot</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="rightFoot">
                <IonLabel>Right foot</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonRow>
          <IonRow class="ion-margin-top">
            <IonCol className="ion-text-center">gender: </IonCol>
            <IonCol className="ion-text-center">
              {gender === "m" ? "Male" : "Female"}
            </IonCol>
          </IonRow>
          {Object.entries(foot).map(([key, value]) => {
            if (key === "soleImage" || key === "sideImage") {
              return (
                <IonRow>
                  <IonCol className="ion-text-center">
                    {toSpaceCase(key)}:
                  </IonCol>
                  <IonCol className="ion-text-center">
                    <IonButton
                      size="small"
                      onClick={() => {
                        setShowImage(true);
                        setImage(value);
                      }}
                    >
                      Show
                    </IonButton>
                  </IonCol>
                </IonRow>
              );
            } else {
              return (
                <IonRow>
                  <IonCol className="ion-text-center">
                    {toSpaceCase(key)}:
                  </IonCol>
                  <IonCol className="ion-text-center">{value as any} cm</IonCol>
                </IonRow>
              );
            }
          })}
        </IonGrid>
      </IonContent>

      <IonButton onClick={() => props.onClose()}>Close</IonButton>
      <ShowIamge image={image} show={showImage} onClose={onClose} />
    </IonModal>
  );
};
export default VolunteerDetail;

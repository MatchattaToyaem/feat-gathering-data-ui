import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { RouteComponentProps } from "react-router";
import { techsDetail } from "../utils/Guidline";
import './css/GuidlineDetail.css';
interface GuidlineDetailProps
  extends RouteComponentProps<{
    name: string;
  }> {}

const GuidlineDetail: React.FC<GuidlineDetailProps> = ({ match }) => {
  const tech = techsDetail.find(
    (techDetail) => techDetail.title === match.params.name
  );
  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/main/guidline" />
          </IonButtons>
          <IonTitle>{match.params.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class="ion-padding">
        <p>{tech?.description}</p>
      </IonContent>
    </IonPage>
  );
};

export default GuidlineDetail;

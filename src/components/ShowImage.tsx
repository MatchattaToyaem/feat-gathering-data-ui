import React from "react";
import {
  IonModal,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonImg,
} from "@ionic/react";

interface IProps {
  onClose: Function;
  image: any;
  show: boolean;
}

const ShowIamge: React.FC<IProps> = (props) => {
  return (
    <IonModal
      isOpen={props.show}
      swipeToClose={true}
      onDidDismiss={() => props.onClose()}
    >
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Image</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonImg src={props.image}/>
      </IonContent>
      <IonButton onClick={() => props.onClose()}>Close</IonButton>
    </IonModal>
  );
};
export default ShowIamge;

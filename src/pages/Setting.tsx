import React from 'react';
import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './css/Guidline.css';
import GoogleLogout from '../components/Google/GoogleLogout';
import "./css/Setting.css"

const Setting: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Setting</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Setting</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
            <GoogleLogout/>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Setting;

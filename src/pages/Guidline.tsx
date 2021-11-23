import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './css/Guidline.css';
import Navigation from '../components/GuidlineNavigation';

const Guidline: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Guidline</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Guidline</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Navigation/>
      </IonContent>
    </IonPage>
  );
};

export default Guidline;

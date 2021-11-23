import React from "react";
import { IonList, IonItem, IonLabel, IonContent, IonIcon } from "@ionic/react";
import { techsDetail } from "../utils/Guidline";

const Navigation: React.FC = () => {
  const techs = techsDetail;
  return (
    <IonContent fullscreen>
      <IonList lines ="full" mode="ios">
        {techs.map((tech) => {
          const guidline = `/main/guidline/${tech.title}`;
          return (
            <IonItem routerLink={guidline} class="ion-margin-top">
              <IonIcon slot="start" icon={tech.icon}/>
              <IonLabel>
                <h2>{tech.title}</h2>
              </IonLabel>
            </IonItem>
          );
        })}
      </IonList>
    </IonContent>
  );
};

export default Navigation;

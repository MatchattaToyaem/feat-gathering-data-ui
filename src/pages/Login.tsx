import React from "react";
import {
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonPage,
  IonRow,
} from "@ionic/react";
import logo from "../media/logo.png"
import "./css/Guidline.css";
import GoogleLogin from "../components/Google/GoogleLogin";
import "./css/Login.css";
import "./css/color.css"

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonGrid style={{marginTop:"100px"}}>
          <IonRow class="ion-justify-content-center">
            <IonCol size="6">
              <IonImg src={logo} style={{height:"95px"}}/>
            </IonCol>
          </IonRow>
          <IonRow class="ion-justify-content-center">
            <IonCol
              size="6"
              class="ion-text-center"
              style={{ fontSize: "28px", fontWeight: "bold" }}
            >
              Log in
            </IonCol>
          </IonRow>
          <IonRow class="ion-justify-content-center">
            <IonCol
              size="8"
              class="ion-text-center"
              style={{ fontSize: "16px", marginBottom: "50px"}}
            >
              Welcome back, Sign in to continue FootFit application
            </IonCol>
          </IonRow>
          <IonRow class="ion-justify-content-center">
            <IonCol size="8">
              <GoogleLogin />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;

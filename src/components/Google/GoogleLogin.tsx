import { IonButton, IonCol, IonGrid, IonImg, IonRow } from "@ionic/react";
import google from "../../media/google.png"
import React from "react";
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  useGoogleLogin,
} from "react-google-login";
import { Redirect } from "react-router";
import { RefreshToken } from "../../utils/RefreshToken";
import Cookies from "universal-cookie";
import config from "../../config.json";

const clientId: string = config.client_id;

const cookie = new Cookies();

const GoogleLogin = () => {
  const [redirect, setRedirect] = React.useState(false);
  const onSuccess = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    RefreshToken(res);
    setRedirect(true);
    cookie.set("email", (res as GoogleLoginResponse).profileObj.email, {
      path: "/",
    });
  };
  React.useEffect(() => {
    if (redirect) {
      setRedirect(false);
      window.location.reload();
    }
  },[redirect]);
  const onFailure = (error: any) => {
    console.log(error);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: "offline",
  });

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect from="/login" to="/main" />;
    }
  };

  return (
    <>
      {renderRedirect()}
      <IonButton onClick={signIn} size="default" expand="block">
        <IonGrid style={{padding:"2px"}}>
          <IonRow class="ion-justify-content-start">
            <IonCol class ="ion-align-self-center ion-no-padding center-block">
              <IonImg src = {google} class="img-google"/>
            </IonCol>
            <IonCol class ="ion-align-self-center ion-no-padding">
              <div>Sign in with Google</div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonButton>
    </>
  );
};

export default GoogleLogin;

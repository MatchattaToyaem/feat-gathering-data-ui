import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import { logOut } from "ionicons/icons";
import React from "react";
import {
  useGoogleLogout,
} from "react-google-login";
import { Redirect } from "react-router";
import Cookies from "universal-cookie";
import config from "../../config.json"


const cookie = new Cookies();



const clientId: string = config.client_id


const GoogleLogout: React.FC = () => {
  const [redirect, setRedirect] = React.useState(false);
  const onLogoutSuccess = () => {
    setRedirect(true);
    cookie.remove("email", {path:"/"})
    alert("Aleady logged out");
  };
  const onFailure = () => {
    console.log("Log out fail");
  };

  const { signOut } = useGoogleLogout({
    onLogoutSuccess,
    onFailure,
    clientId,
  });

  const renderRedirect = () => {
    if (redirect) {
    return <><Redirect from="/main/setting" to="/login" /></>;
    }
  };

  return (
    <>
      {renderRedirect()}
      <IonItem /*onClick={signOut}*/>
        <IonIcon icon={logOut} class="padding-right" />
        <IonLabel>Log out</IonLabel>
      </IonItem>
    </>
  );
};

export default GoogleLogout;

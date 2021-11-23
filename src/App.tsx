import React from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Main from "./pages/Main";
import Login from "./pages/Login";
import History from "./utils/History";

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter history = {History}>
      <IonRouterOutlet>
        <Route path ="/main" component = {Main}/>
        <Route path ="/login" component = {Login}/>
        <Redirect exact from = "/" to = "/main"/>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;

import React from "react";
import {
  Redirect,
  Route,
  RouteComponentProps,
  withRouter,
} from "react-router-dom";
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  informationCircleOutline,
  addCircleOutline,
  documentTextOutline,
  settings,
} from "ionicons/icons";
import Guidline from "./Guidline";
import AddingFoot from "./AddingFoot";
import Result from "./Result";
import GuidlineDetail from "./GuidlineDetail";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import Setting from "./Setting";
import History from "../utils/History";
import Cookies from "universal-cookie";
import AddFootPhoto from "./AddFootPhoto";
import EditRecord from "./EditRecord";

const Main: React.FC<RouteComponentProps> = ({ match }) => {
  const cookie = new Cookies();
  cookie.set("email", "matchatta.toy@gmail.com", {
    path: "/",
  });
  return (
    <IonReactRouter history={History}>
          <IonTabs>
            <IonRouterOutlet>
              <Route
                exact
                path={`${match.url}/guidline`}
                component={Guidline}
              />
              <Route
                exact
                path={`${match.url}/guidline/:name`}
                component={GuidlineDetail}
              />
              <Route
                exact
                path={`${match.url}/add_foot`}
                component={AddingFoot}
              />
              <Route exact path={`${match.url}/records`} component={Result} />
              <Route exact path={`${match.url}/setting`} component={Setting}/>
              <Route exact path={`${match.url}/add_foot/add_photo`} component={AddFootPhoto}/>
              <Route exact path={`${match.url}/records/edit`} component={EditRecord}/>
              <Redirect exact from={match.url} to={`${match.url}/guidline`} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="guidline" href="/main/guidline">
                <IonIcon icon={informationCircleOutline} />
                <IonLabel>Guidline</IonLabel>
              </IonTabButton>
              <IonTabButton tab="add foot" href={`/main/add_foot`}>
                <IonIcon icon={addCircleOutline} />
                <IonLabel>Adding foot</IonLabel>
              </IonTabButton>
              <IonTabButton tab="Records" href={`/main/records`}>
                <IonIcon icon={documentTextOutline} />
                <IonLabel>Records</IonLabel>
              </IonTabButton>
              <IonTabButton tab="setting" href={`/main/setting`}>
                <IonIcon icon={settings} />
                <IonLabel>Setting</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
    // <>
    //   {cookie.get("email") ? (
        
    //   ) : (
    //     <Redirect exact from={match.url} to="/login" />
    //   )}
    // </>
  );
};

export default withRouter(Main);

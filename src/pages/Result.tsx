import React, { Component } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import "./css/Result.css";
import { IResults } from "../utils/interfaces/IResult";
import ResultsList from "../components/Result/ResultsList";
import { GetVolunteers } from "../endpoints/GetVolunteers";
import Cookies from "universal-cookie";
import VolunteerDetail from "../components/VolunteerDetail";

interface IProps {}

interface IState {
  loadCompleted: boolean;
  error: any;
  results: Array<IResults> | [];
  showDetail: boolean;
  selectedResult: IResults | undefined;
}

class Result extends Component<IProps, IState> {
  cookie: Cookies;
  constructor(props: IProps) {
    super(props);
    this.state = {
      loadCompleted: false,
      error: {},
      results: [],
      showDetail: false,
      selectedResult: undefined,
    };
    this.cookie = new Cookies();
  }

  componentDidMount() {
    const email = this.cookie.get("email") ? this.cookie.get("email") : "";
    const endpoint = process.env.REACT_APP_END_POINTS||""
    console.log(endpoint)
    fetch(`${endpoint}` as string, GetVolunteers(email))
      .then((result) => result.json())
      .then(
        (result) => {
          this.setState({
            loadCompleted: true,
            results: result,
          });
        },
        (error) => {
          this.setState({ error: error });
        }
      );
  }

  clickResultHandle = (result: IResults | undefined) => {
    this.setState({
      selectedResult: result,
      showDetail: true,
    });
  };

  clickCloseHandle = () => {
    this.setState({
      selectedResult: undefined,
      showDetail: false,
    });
  };

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Records</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Records</IonTitle>
            </IonToolbar>
          </IonHeader>
          {this.state.loadCompleted && (
            <ResultsList
              results={this.state.results}
              onClickListener={this.clickResultHandle}
            />
          )}
          <VolunteerDetail
            onClose={this.clickCloseHandle}
            result={this.state.selectedResult}
            show={this.state.showDetail}
          />
          <IonToast
            isOpen={!this.state.loadCompleted}
            onDidDismiss={() => {}}
            message="Loading"
            position="bottom"
          />
        </IonContent>
      </IonPage>
    );
  }
}

export default Result;

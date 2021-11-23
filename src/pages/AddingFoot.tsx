import React, { Component } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
} from "@ionic/react";
import "./css/AddingFoot.css";
import GeneralInformationForm from "../components/GeneralInformationForm";
import { IManualElementValue } from "../utils/interfaces/IManualElementValue";
import { Link } from "react-router-dom";

interface IProps {}
interface IState {
  redirect: boolean;
  manualElementValue: IManualElementValue;
}

class AddingFoot extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      redirect: false,
      manualElementValue: {
        idFromNSTDA: undefined,
        shoeSize: undefined,
        gender: undefined,
        left: {
          footArchHeight: 1,
          foreWidth: 1,
          middleWidth: 1,
          heelWidth: 1,
          heelToFore: 1,
          heelToMiddle: 1,
          heelToMetatarsalgia: 1,
        },
        right: {
          footArchHeight: 1,
          foreWidth: 1,
          middleWidth: 1,
          heelWidth: 1,
          heelToFore: 1,
          heelToMiddle: 1,
          heelToMetatarsalgia: 1,
        },
      },
    };
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Adding foot</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Adding foot</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonGrid>
            {this.renderForm()}
            <IonRow>
              <IonCol>
                {this.state.redirect && (
                  <Link
                    to={{
                      pathname: "/main/add_foot/add_photo",
                      state: this.state.manualElementValue,
                    }}
                  >
                    <IonButton expand="block">Next</IonButton>
                  </Link>
                )}
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  }

  handleChangeInput = (
    footSide: string | undefined,
    value: string,
    component: string
  ) => {
    if (!footSide) {
      (this.state.manualElementValue as any)[component] = value;
      console.log(this.state.manualElementValue.idFromNSTDA)
    } else {
      switch (footSide) {
        case "left":
          (this.state.manualElementValue.left as any)[component] = value;
          break;
        case "right":
          (this.state.manualElementValue.right as any)[component] = value;
          break;
      }
    }
    this.checkForm();
  };

  checkForm = () => {
    let completed = true;
    this.setState({ redirect: false });
    Object.values(this.state.manualElementValue).forEach((value) => {
      if (!value) {
        completed = false;
      } else {
        if (Object.keys(value).includes("foreWidth")) {
          Object.values(value).forEach((manualMeasurementValue) => {
            if (!manualMeasurementValue || manualMeasurementValue === 0) {
              completed = false;
            }
          });
        }
      }
    });
    this.setState({ redirect: completed });
  };

  renderForm = () => {
    return (
      <>
        <GeneralInformationForm
          manualElementValue={this.state.manualElementValue}
          handleChangeInput={this.handleChangeInput}
        />
      </>
    );
  };
}

export default AddingFoot;

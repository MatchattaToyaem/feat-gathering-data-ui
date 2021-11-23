import { IonAlert } from "@ionic/react";
import React from "react";

interface IProps{
    onDismissError: Function
    title: string
    message: string
    show: boolean
}
const Alert: React.FC<IProps> = (props) => {
  return (
    <IonAlert
      isOpen={props.show}
      header={props.title}
      message={props.message}
      buttons={[
        {
          text: "Cancle",
          handler: () => {
              props.onDismissError()
          },
        },
      ]}
    />
  );
};

export default Alert;

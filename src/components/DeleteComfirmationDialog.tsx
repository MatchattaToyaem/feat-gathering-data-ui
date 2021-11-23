import { IonAlert } from "@ionic/react";
import React from "react";

interface IProps {
  deleteHandler(perspective: string, side: string, index: string): void;
  onDismissAlert(): void;
  perspective: string;
  side: string;
  index: string;
  showDelete: boolean;
  message: string;
}
const DeleteConfirmationDialog: React.FC<IProps> = (props) => {
  return (
    <IonAlert
      isOpen={props.showDelete}
      onDidDismiss={() => props.onDismissAlert()}
      header={"Confirmation"}
      message={props.message}
      buttons={[
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "Delete",
          handler: () => {
            props.deleteHandler(props.perspective, props.side, props.index);
          },
        },
      ]}
    />
  );
};

export default DeleteConfirmationDialog;

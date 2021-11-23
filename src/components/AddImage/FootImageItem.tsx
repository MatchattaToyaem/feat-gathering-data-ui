import {
  IonActionSheet,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonRow,
} from "@ionic/react";
import { ellipsisVertical } from "ionicons/icons";
import React from "react";
import {
  CROP,
  MARK_POINT,
  RETAKE_PHOTO,
} from "../../utils/constants/AcionType";
import DeleteConfirmationDialog from "../DeleteComfirmationDialog";

interface IProps {
  key: string;
  perspective: string;
  side: string;
  index: string;
  deleteHandler(perspective: string, side: string, index: string): void;
  onClickAction(
    perspective: string,
    side: string,
    index: string | undefined,
    actionType: string
  ): void;
}

const FootImageItem: React.FC<IProps> = (props) => {
  const [showAction, setShowAction] = React.useState(false);
  const [showDelete, setShowDelete] = React.useState(false);

  const onDismissAlert = () => {
    setShowDelete(false);
  };
  return (
    <>
      <IonItem>
        <IonLabel>
          <IonGrid>
            <IonRow class="ion-no-padding">
              <IonCol size="11">{`${props.side.charAt(0).toLocaleUpperCase()+props.side.slice(1)} ${props.perspective} ${
                +props.index + 1
              }`}</IonCol>
              <IonCol
                size="1"
                onClick={() => {
                  setShowAction(true);
                }}
              >
                <IonIcon icon={ellipsisVertical} />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonLabel>
        <IonActionSheet
          isOpen={showAction}
          onDidDismiss={() => setShowAction(false)}
          cssClass="my-custom-class"
          buttons={[
            {
              text: "Retake an image",
              handler: () => {
                props.onClickAction(
                  props.perspective,
                  props.side,
                  props.index,
                  RETAKE_PHOTO
                );
              },
            },
            {
              text: "Crop image",
              handler: () => {
                props.onClickAction(
                  props.perspective,
                  props.side,
                  props.index,
                  CROP
                );
              },
            },
            {
              text: "Mark point",
              handler: () => {
                props.onClickAction(
                  props.perspective,
                  props.side,
                  props.index,
                  MARK_POINT
                );
              },
            },
            {
              text: "Delete",
              role: "destructive",
              handler: () => {
                setShowDelete(true);
              },
            },
            {
              text: "Cancel",
              role: "cancel",
            },
          ]}
        />
      </IonItem>
      <DeleteConfirmationDialog
        onDismissAlert={onDismissAlert}
        showDelete={showDelete}
        perspective={props.perspective}
        side={props.side}
        index={props.index}
        deleteHandler={props.deleteHandler}
        message={`Do you want to delete ${props.side} ${props.perspective} ${
          +props.index + 1
        } ?`}
      />
    </>
  );
};

export default FootImageItem;

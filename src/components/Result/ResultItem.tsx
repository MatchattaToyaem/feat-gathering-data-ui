import {
  IonActionSheet,
  IonAlert,
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
  IonRow,
} from "@ionic/react";
import { ellipsisVertical } from "ionicons/icons";
import React from "react";
import { Redirect } from "react-router";
import { EDIT } from "../../utils/constants/AcionType";
import { LEFT } from "../../utils/constants/FootSide";
import { IResults } from "../../utils/interfaces/IResult";
import Segment from "../Segment";
import ManualMeasurementDetail from "./ManualMeasurementDetail";

interface IProps {
  objectID: number;
  data: IResults;
  onDelete(id: number): void;
}
const ResultItem: React.FC<IProps> = (props) => {
  const { objectID, onDelete } = props;
  const [showAction, setShowAction] = React.useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [showInformation, setShowInformation] = React.useState(false);
  const [currentSide, setCurrentSide] = React.useState(LEFT);
  const [edit, setEdit] = React.useState(false);
  const onSelectSegment = (value: string) => {
    setCurrentSide(value);
  };
  return (
    <IonItem>
      <IonLabel>
        <IonGrid>
          <IonRow class="ion-no-padding">
            <IonCol size="11">{`${"ID: " + objectID}`}</IonCol>
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
      {edit && (
        <Redirect to={{ pathname: "/main/records/edit", state: props.data }} />
      )}

      <IonActionSheet
        isOpen={showAction}
        onDidDismiss={() => setShowAction(false)}
        cssClass="my-custom-class"
        buttons={[
          {
            text: "Detail",
            handler: () => {
              setShowInformation(true);
            },
          },
          {
            text: EDIT,
            handler: () => {
              setEdit(false);
              setEdit(true);
            },
          },
          {
            text: "Delete",
            role: "destructive",
            handler: () => {
              setShowDeleteDialog(true);
            },
          },
          {
            text: "Cancel",
            role: "cancel",
          },
        ]}
      />
      <IonAlert
        isOpen={showDeleteDialog}
        onDidDismiss={() => {
          setShowDeleteDialog(false);
        }}
        header={"Confirmation"}
        message={`${"Do you want to delete record id " + objectID + " ?"}`}
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {
              setShowDeleteDialog(false);
            },
          },
          {
            text: "Delete",
            handler: () => {
              onDelete(objectID);
            },
          },
        ]}
      />
      <IonModal
        isOpen={showInformation}
        swipeToClose={true}
        onDidDismiss={() => {
          setShowInformation(false);
        }}
      >
        <div className="ion-padding">
          <Segment
            currentValue={currentSide}
            onSelectSegment={onSelectSegment}
          />
        </div>
        <ManualMeasurementDetail
          data={
            currentSide === LEFT
              ? props.data.manualMeasurement.left
              : props.data.manualMeasurement.right
          }
        />

        <IonButton onClick={() => setShowInformation(false)}>Close</IonButton>
      </IonModal>
    </IonItem>
  );
};

export default ResultItem;

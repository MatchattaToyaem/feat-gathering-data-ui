import { IonCol, IonGrid, IonRow } from "@ionic/react";
import React from "react";
import { IManualValue } from "../../utils/interfaces/IManualElementValue";
const decamelize = require("decamelize");

interface IProps {
  data: IManualValue;
}
const ManualMeasurementDetail: React.FC<IProps> = (props) => {
  const { data } = props;
  return (
    <IonGrid class="ion-no-margin ion-padding-horizontal" >
      {Object.entries(data).map(([key, value]) => {
        const title: string = decamelize(key, " ")
        return (
          <IonRow class="ion-margin-top">
            <IonCol size="8" style={{textAlign: "left"}}>{title.charAt(0).toUpperCase() + title.slice(1)}</IonCol>
            <IonCol size="4" style={{textAlign: "right"}}>{value} cm</IonCol>
          </IonRow>
        );
      })}
    </IonGrid>
  );
};

export default ManualMeasurementDetail;

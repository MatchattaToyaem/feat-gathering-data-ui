import { IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";
import React from "react";
import { LEFT, RIGHT } from "../utils/constants/FootSide";

interface IProps {
  currentValue: string
  onSelectSegment(value: string): void;
}
const Segment: React.FC<IProps> = (props) => {
  const onSelectSegment = (value: string) => {
    props.onSelectSegment(value);
  };
  return (
    <IonSegment
      value={props.currentValue}
      onIonChange={(e) => {
        if (e.detail.value) {
          onSelectSegment(e.detail.value);
        }
      }}
    >
      <IonSegmentButton value={LEFT}>
        <IonLabel>Left foot</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value={RIGHT}>
        <IonLabel>Right foot</IonLabel>
      </IonSegmentButton>
    </IonSegment>
  );
};

export default Segment;

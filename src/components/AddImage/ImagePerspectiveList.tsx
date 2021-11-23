import {
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonButton,
  IonAlert,
  IonIcon,
} from "@ionic/react";
import { informationCircleOutline } from "ionicons/icons";
import React from "react";
import {
  RETAKE_PHOTO,
  CROP,
  MARK_POINT,
} from "../../utils/constants/AcionType";
import { SIDE, SOLE } from "../../utils/constants/FootPerspectives";
import { LEFT } from "../../utils/constants/FootSide";
import { ISideFoot } from "../../utils/interfaces/ISideFoot";
import { ISoleFoot } from "../../utils/interfaces/ISoleFoot";
import Segment from "../Segment";
import FootImageItem from "./FootImageItem";

interface IProps {
  left: { soles: ISoleFoot[]; sides: ISideFoot[] };
  right: { soles: ISoleFoot[]; sides: ISideFoot[] };
  onClickSubmission(): void;
  deleteHandler(perspective: string, side: string, index: string): void;
  addImageHandler(
    perspective: string,
    side: string,
    index: string | undefined
  ): void;
  onClickItemActionHandler(
    perspective: string,
    side: string,
    index: string,
    actionType: string
  ): void;
  onSelectFootSide(footSide: string): void;
  selectedFootSide: string;
}
const ImagePerspectiveList: React.FC<IProps> = (props) => {
  const [showAlert, setShowAlert] = React.useState<boolean>(false);
  const [showInformation, setShowInformation] = React.useState<boolean>(false);
  const checkSubmitcondition = () => {
    const { left, right } = props;
    const allSides = [left, right];
    let pass = true;
    allSides.forEach((side) => {
      const nuberOfSidePerspective = side.sides.flat().length;
      const numberOfSolePerspective = side.soles.flat().length;
      if (numberOfSolePerspective < 3 || nuberOfSidePerspective < 3) {
        pass = false;
      }
      side.soles.forEach((component) => {
        const soleComponent = Object.fromEntries(
          Object.entries(component).filter(
            ([, value]) => value.x !== 0 && value.y !== 0
          )
        );
        if (
          Object.keys(soleComponent).length !== Object.keys(component).length
        ) {
          pass = false;
        }
      });
      side.sides.forEach((component) => {
        const soleComponent = Object.fromEntries(
          Object.entries(component).filter(
            ([, value]) => value.x !== 0 && value.y !== 0
          )
        );
        if (
          Object.keys(soleComponent).length !== Object.keys(component).length
        ) {
          pass = false;
        }
      });
    });
    return pass;
  };

  const onSelectSegment = (value: string) => {
    props.onSelectFootSide(value);
  };

  const onClickItemAction = (
    perspective: string,
    side: string,
    index: string | undefined,
    actionType: string
  ) => {
    switch (actionType) {
      case RETAKE_PHOTO:
        props.addImageHandler(perspective, side, String(index));
        break;
      case CROP:
        props.onClickItemActionHandler(perspective, side, String(index), CROP);
        break;
      case MARK_POINT:
        props.onClickItemActionHandler(
          perspective,
          side,
          String(index),
          MARK_POINT
        );
        break;
    }
  };

  const onClickAddPhoto = () => {
    setShowAlert(true);
  };

  const onSelectPerspective = async (perspective: string) => {
    props.addImageHandler(perspective, props.selectedFootSide, undefined);
  };

  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <Segment
            currentValue={props.selectedFootSide}
            onSelectSegment={onSelectSegment}
          />
        </IonCol>
      </IonRow>
      <IonRow class="ion-align-items-center ion-justify-content-end">
        <IonCol size="1">
          <IonIcon onClick={()=> setShowInformation(true)} icon={informationCircleOutline} />
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonList>
            {Object.entries((props as any)[props.selectedFootSide]).map(
              ([perspective, footComponentList], i) => {
                return (
                  <div key={`${props.selectedFootSide + perspective + i}`}>
                    {(footComponentList as any).map(
                      (value: any, index: number) => {
                        return (
                          <FootImageItem
                            key={`${
                              props.selectedFootSide + perspective + index
                            }`}
                            perspective={perspective}
                            side={props.selectedFootSide}
                            index={String(index)}
                            deleteHandler={props.deleteHandler}
                            onClickAction={onClickItemAction}
                          />
                        );
                      }
                    )}
                  </div>
                );
              }
            )}
          </IonList>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonButton expand="block" onClick={onClickAddPhoto}>
            Add foot image
          </IonButton>
        </IonCol>
      </IonRow>
      {checkSubmitcondition() && (
        <IonRow>
          <IonCol>
            <IonButton
              expand="block"
              onClick={async () => await props.onClickSubmission()}
            >
              Submit
            </IonButton>
          </IonCol>
        </IonRow>
      )}
      <IonAlert
        isOpen={showInformation}
        onDidDismiss={() => setShowInformation(false)}
        header={"Remaining images"}
        message={`${
          props.selectedFootSide === LEFT
            ? "Sole image: " +
              props.left.soles.length +
              "/3, Side image: " +
              props.left.sides.length +
              "/3"
            : "Sole image: " +
              props.right.soles.length +
              "/3\nSide image: " +
              props.right.sides.length +
              "/3"
        }`}
      />
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={"Foot component"}
        inputs={[
          {
            name: "foot_sole",
            type: "radio",
            label: "Foot sole",
            value: SOLE,
            checked: true,
          },
          {
            name: "fiit_side",
            type: "radio",
            label: "Foot side",
            value: SIDE,
          },
        ]}
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
          },
          {
            text: "Ok",
            handler: (data: string) => {
              onSelectPerspective(data);
            },
          },
        ]}
      />
    </IonGrid>
  );
};

export default ImagePerspectiveList;

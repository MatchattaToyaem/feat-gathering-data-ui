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
  IonAlert,
  IonIcon,
  IonButtons,
  IonBackButton,
  IonToast,
} from "@ionic/react";
import "./css/AddingFoot.css";
import GeneralInformationForm from "../components/GeneralInformationForm";
import {
  IManualElementValue,
} from "../utils/interfaces/IManualElementValue";
import { IResults } from "../utils/interfaces/IResult";
import { chevronBack, image } from "ionicons/icons";
import { FORM } from "../utils/constants/Component";
import {
  CROP,
  MARK_POINT,
  PERSPECTIVE_LIST,
} from "../utils/constants/AcionType";
import ImagePerspectiveList from "../components/AddImage/ImagePerspectiveList";
import { ISideFoot } from "../utils/interfaces/ISideFoot";
import { ISoleFoot } from "../utils/interfaces/ISoleFoot";
import { APIToReact } from "../utils/TransformData";
import { LEFT, RIGHT } from "../utils/constants/FootSide";
import { TakeImage } from "../utils/TakeImage";
import { SOLE, SIDE } from "../utils/constants/FootPerspectives";
import CropImage from "../components/AddImage/CropImage";
import MarkingFoot from "../components/AddImage/MarkingFoot";
import { UpdateVolunteer } from "../endpoints/UpdateVolunteer";

interface IFeetList {
  soles: ISoleFoot[];
  sides: ISideFoot[];
}

interface IProps {
  location: {
    state: IResults;
  };
}
interface IState {
  error: any,
  loadCompleted: boolean;
  fetchingMessage: string | undefined;
  showAlertFetching: boolean;
  manualMeasurement: IManualElementValue;
  complete: boolean;
  currentComponent: string;
  currentSubcomponent: string;
  currentFootSide: string;
  leftFeetList: IFeetList | undefined;
  rightFeetList: IFeetList | undefined;
  currentSelectedImage: {
    perspective: string | undefined;
    side: string | undefined;
    index: string | undefined;
  };
  containerRect: DOMRect;
}

class EditRecord extends Component<IProps, IState> {
  containerRef: React.RefObject<HTMLIonContentElement>;
  getRectInterval: any;
  constructor(props: IProps) {
    super(props);
    console.log(props.location.state)
    const defaultRect: DOMRect = new DOMRect();
    const { gender, shoeSize, manualMeasurement, idFromNSTDA } = props.location.state;
    const transformdata:
      | {
        left: {
          soles: ISoleFoot[];
          sides: ISideFoot[];
        };
        right: {
          soles: ISoleFoot[];
          sides: ISideFoot[];
        };
      }
      | undefined = APIToReact(this.props.location.state);
    this.containerRef = React.createRef<HTMLIonContentElement>();
    this.getRectInterval = undefined;
    this.state = {
      error: undefined,
      loadCompleted: false,
      fetchingMessage: undefined,
      showAlertFetching: false,
      manualMeasurement: {
        idFromNSTDA: idFromNSTDA,
        gender: gender,
        shoeSize: shoeSize,
        left: manualMeasurement.left,
        right: manualMeasurement.right,
      },
      complete: false,
      currentComponent: FORM,
      currentSubcomponent: PERSPECTIVE_LIST,
      currentFootSide: LEFT,
      leftFeetList: transformdata ? transformdata.left : undefined,
      rightFeetList: transformdata ? transformdata.right : undefined,
      currentSelectedImage: {
        perspective: undefined,
        side: undefined,
        index: undefined,
      },
      containerRect: defaultRect,
    };
  }

  componentDidMount() {
    this.setState({
      complete: true,
    });
    this.getRectInterval = setInterval(() => {
      this.setState((previousState): any => {
        const containerRect = this.containerRef.current?.getBoundingClientRect();
        return JSON.stringify(containerRect) ===
          JSON.stringify(previousState.containerRect)
          ? null
          : { containerRect };
      });
    }, 10);
    this.loadAllImages(this.state.leftFeetList, "left")
    this.loadAllImages(this.state.rightFeetList, "right")
  }

  componentWillUnmount() {
    clearInterval(this.getRectInterval);
  }

  loadAllImages = (feetList: IFeetList | undefined, side: string) => {
    let allSoles: Array<string> = []
    let allSides: Array<string> = []
    if (feetList) {
      feetList.soles.forEach((sole) => {
        allSoles.push(sole.image.original)
      })
      feetList.sides.forEach((side) => {
        allSides.push(side.image.original)
      })
      this.loadImage(allSoles.toString(), "sole", side)
      this.loadImage(allSides.toString(), "side", side)
      this.setState({
        loadCompleted: true
      })
    }

  }

  loadImage = (images: string, component: string, side: string) => {
    const endpoint = process.env.REACT_APP_END_POINTS || ""
    const requestOption = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "file-names": images,
      },
    };

    fetch(`${endpoint}/photo` as string, requestOption)
      .then((result) => result.json())
      .then(
        (result) => {
          const results: Array<string> = result
          results.forEach((result, index)=>{
            if(side === "left"){
              if(component === "sole"){
                this.setState((prevState) => {
                  let leftFeetList = Object.assign({}, prevState.leftFeetList);  // creating copy of state variable jasper
                  leftFeetList.soles[index].image.original = result;      
                  leftFeetList.soles[index].image.croped = result;              
                  return { leftFeetList };                                 // return new object jasper object
                })
              }
              else if(component === "side"){
                this.setState((prevState) => {
                  let leftFeetList = Object.assign({}, prevState.leftFeetList);  // creating copy of state variable jasper
                  leftFeetList.sides[index].image.original = result;      
                  leftFeetList.sides[index].image.croped = result;              
                  return { leftFeetList };                                 // return new object jasper object
                })
              }
            }
            else if(side === "right"){
              if(component === "sole"){
                this.setState((prevState) => {
                  let rightFeetList = Object.assign({}, prevState.rightFeetList);  // creating copy of state variable jasper
                  rightFeetList.soles[index].image.original = result;      
                  rightFeetList.soles[index].image.croped = result;              
                  return { rightFeetList };                                 // return new object jasper object
                })
              }
              else if(component === "side"){
                this.setState((prevState) => {
                  let rightFeetList = Object.assign({}, prevState.rightFeetList);  // creating copy of state variable jasper
                  rightFeetList.sides[index].image.original = result;      
                  rightFeetList.sides[index].image.croped = result;              
                  return { rightFeetList };                                 // return new object jasper object
                })
              }
            }
          })
        },
        (error) => {
          this.setState({ error: error });
        }
      );
  }

  onClickBack = () => {
    if (this.state.currentComponent === PERSPECTIVE_LIST) {
      this.setState({ currentComponent: FORM });
    } else {
      this.setState({ currentComponent: PERSPECTIVE_LIST });
    }
  };

  onClickSubmission = async () => {
    const { collectorEmail, id } = this.props.location.state;
    const { leftFeetList, rightFeetList, manualMeasurement} = this.state;
    const { gender, left, right, shoeSize } = manualMeasurement
    const endpoint = process.env.REACT_APP_END_POINTS || ""
    if (leftFeetList && rightFeetList && right && left && gender && shoeSize &&manualMeasurement.idFromNSTDA)
      await fetch(
        endpoint,
        UpdateVolunteer(
          id,
          manualMeasurement.idFromNSTDA,
          collectorEmail,
          { left: left, right: right },
          gender,
          shoeSize,
          leftFeetList,
          rightFeetList
        )
      ).then((response) => {
        if (response.ok) {
          this.setState({
            showAlertFetching: true,
            fetchingMessage: "Completed",
          });
        } else {
          this.setState({
            showAlertFetching: true,
            fetchingMessage: "Failed",
          });
        }
      });
  };

  deleteHandler = (perspective: string, side: string, index: string) => {
    this.updateOrDeleteImage(perspective, side, index, undefined);
  };

  addImageHandler = async (
    perspective: string,
    side: string,
    index: string | undefined
  ) => {
    await TakeImage(perspective).then((result) => {
      if (index) {
        this.updateOrDeleteImage(perspective, side, index, result);
      } else {
        this.updateOrDeleteImage(perspective, side, undefined, result);
      }
    });
  };

  updateOrDeleteImage = (
    perspective: string,
    side: string,
    index: string | undefined,
    result: string | undefined
  ) => {
    const initialCoordinate = { x: 0, y: 0 };
    const initialSoleFoot: ISoleFoot = {
      image: { original: result ? result : "", croped: result ? result : "" },
      fore: initialCoordinate,
      metatarsalgia: initialCoordinate,
      middle: initialCoordinate,
      heel: initialCoordinate,
      apex5: initialCoordinate,
    };
    const initialSideFoot: ISideFoot = {
      image: { original: result ? result : "", croped: result ? result : "" },
      ankleSprain: initialCoordinate,
    };
    if (this.state.leftFeetList && this.state.rightFeetList)
      switch (side) {
        case LEFT:
          switch (perspective) {
            case SOLE:
              const soleList = index
                ? [...this.state.leftFeetList.soles]
                : [...this.state.leftFeetList.soles, initialSoleFoot];
              if (result && index) {
                soleList[+index] = initialSoleFoot;
              } else if (index) {
                soleList.splice(+index, 1);
              }
              this.setState((prvState: any) => ({
                leftFeetList: {
                  ...prvState.leftFeetList,
                  soles: soleList,
                },
              }));
              break;
            case SIDE:
              const sideList = index
                ? [...this.state.leftFeetList.sides]
                : [...this.state.leftFeetList.sides, initialSideFoot];
              if (result && index) {
                sideList[+index] = initialSideFoot;
              } else if (index) {
                sideList.splice(+index, 1);
              }
              this.setState((prvState: any) => ({
                leftFeetList: {
                  ...prvState.leftFeetList,
                  sides: sideList,
                },
              }));
              break;
          }
          break;
        case RIGHT:
          switch (perspective) {
            case SOLE:
              const soleList = index
                ? [...this.state.rightFeetList.soles]
                : [...this.state.rightFeetList.soles, initialSoleFoot];
              if (result && index) {
                soleList[+index] = initialSoleFoot;
              } else if (index) {
                soleList.splice(+index, 1);
              }
              this.setState((prvState: any) => ({
                rightFeetList: {
                  ...prvState.rightFeetList,
                  soles: soleList,
                },
              }));
              break;
            case SIDE:
              const sideList = index
                ? [...this.state.rightFeetList.sides]
                : [...this.state.rightFeetList.sides, initialSideFoot];
              if (result && index) {
                sideList[+index] = initialSideFoot;
              } else if (index) {
                sideList.splice(+index, 1);
              }
              this.setState((prvState: any) => ({
                rightFeetList: {
                  ...prvState.rightFeetList,
                  sides: sideList,
                },
              }));
              break;
          }
          break;
      }
  };

  onClickItemActionHandler = (
    perspective: string,
    side: string,
    index: string,
    actionType: string
  ) => {
    const currentSelectedImage = { ...this.state.currentSelectedImage };
    currentSelectedImage.index = index;
    currentSelectedImage.side = side;
    currentSelectedImage.perspective = perspective;
    this.setState({
      currentSelectedImage: currentSelectedImage,
      currentComponent: actionType,
    });
  };

  cropImageHandler = (image: string | undefined) => {
    const { side, perspective, index } = this.state.currentSelectedImage;
    if (
      side &&
      perspective &&
      index &&
      this.state.leftFeetList &&
      this.state.rightFeetList
    ) {
      const feetList =
        side === LEFT ? this.state.leftFeetList : this.state.rightFeetList;
      const originalImage = (feetList as any)[perspective][index].image
        .original;
      const imageValue = image ? image : originalImage;
      const initialCoordinate = { x: 0, y: 0 };
      const initialSoleFoot: ISoleFoot = {
        image: { original: originalImage, croped: imageValue },
        fore: initialCoordinate,
        metatarsalgia: initialCoordinate,
        middle: initialCoordinate,
        heel: initialCoordinate,
        apex5: initialCoordinate,
      };
      const initialSideFoot: ISideFoot = {
        image: { original: originalImage, croped: imageValue },
        ankleSprain: initialCoordinate,
      };

      if (side === LEFT) {
        const leftFeetList = { ...this.state.leftFeetList };
        (leftFeetList as any)[perspective][+index] =
          perspective === SOLE ? initialSoleFoot : initialSideFoot;
        this.setState({ leftFeetList: leftFeetList });
      } else {
        const rightFeetList = { ...this.state.rightFeetList };
        (rightFeetList as any)[perspective][+index] =
          perspective === SOLE ? initialSoleFoot : initialSideFoot;
        this.setState({ rightFeetList: rightFeetList });
      }
    }
  };

  markPointHandler = (
    footComponent: { x: number; y: number },
    component: string
  ) => {
    const { side, perspective, index } = this.state.currentSelectedImage;
    const footList =
      side === LEFT ? this.state.leftFeetList : this.state.rightFeetList;
    (footList as any)[perspective!][index!][component] = footComponent;
    if (side === LEFT) {
      this.setState({ leftFeetList: footList });
    } else {
      this.setState({ rightFeetList: footList });
    }
  };

  onSelectFootSide = (footSide: string) => {
    this.setState({ currentFootSide: footSide });
  };

  renderInnerComponent = () => {
    const { perspective, side, index } = this.state.currentSelectedImage;
    const { leftFeetList, rightFeetList } = this.state;
    if (leftFeetList && rightFeetList) {
      const footSide =
        side === LEFT ? this.state.leftFeetList : this.state.rightFeetList;
      switch (this.state.currentComponent) {
        case FORM:
          return this.renderForm();
        case PERSPECTIVE_LIST:
          return (
            <ImagePerspectiveList
              left={leftFeetList}
              right={rightFeetList}
              onClickSubmission={this.onClickSubmission}
              deleteHandler={this.deleteHandler}
              addImageHandler={this.addImageHandler}
              onClickItemActionHandler={this.onClickItemActionHandler}
              onSelectFootSide={this.onSelectFootSide}
              selectedFootSide={this.state.currentFootSide}
            />
          );
        case CROP:
          if (perspective && side && index) {
            return (
              <CropImage
                cropImageHandler={this.cropImageHandler}
                originalImage={
                  (footSide as any)[perspective][index].image.croped
                }
              />
            );
          }
          break;
        case MARK_POINT:
          if (perspective && side && index) {
            return (
              <MarkingFoot
                footComponent={(footSide as any)[perspective][index]}
                markPointHandler={this.markPointHandler}
                image={(footSide as any)[perspective][index].image.croped}
                containerRect={this.state.containerRect}
              />
            );
          }
      }
    }
  };

  render() {
    return (
      <IonPage>
        <IonHeader translucent>
          <IonToolbar>
            <IonButtons>
              {this.state.currentComponent !== FORM ? (
                <IonButton onClick={() => this.onClickBack()}>
                  <IonIcon icon={chevronBack} />
                </IonButton>
              ) : (
                  <IonBackButton defaultHref="/main/records/" />
                )}
            </IonButtons>
            <IonTitle>Edit information</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent ref={this.containerRef} fullscreen>
          <IonGrid>
            {this.renderInnerComponent()}
            {this.state.complete && this.state.currentComponent === FORM && (
              <IonRow>
                <IonCol>
                  <IonButton
                    expand="block"
                    onClick={() =>
                      this.setState({
                        currentComponent: PERSPECTIVE_LIST,
                      })
                    }
                  >
                    Edit image
                  </IonButton>
                </IonCol>
              </IonRow>
            )}
            <IonAlert
              isOpen={this.state.showAlertFetching}
              onDidDismiss={() => this.onDismissAlertFetching()}
              header={"Submission"}
              message={this.state.fetchingMessage}
            />
          </IonGrid>
          <IonToast
            isOpen={!this.state.loadCompleted}
            onDidDismiss={() => { }}
            message="Loading"
            position="bottom"
          />
        </IonContent>
      </IonPage>
    );
  }

  onDismissAlertFetching(): void {
    this.setState({ showAlertFetching: false });
  }

  handleChangeInput = (
    footSide: string | undefined,
    value: string,
    component: string
  ) => {
    if (!footSide) {
      (this.state.manualMeasurement as any)[component] = value;
    } else {
      switch (footSide) {
        case "left":
          (this.state.manualMeasurement.left as any)[component] = value;
          break;
        case "right":
          (this.state.manualMeasurement.right as any)[component] = value;
          break;
      }
    }
    this.checkForm();
  };

  checkForm = () => {
    let completed = true;
    Object.values(this.state.manualMeasurement).forEach((value) => {
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
    this.setState({ complete: completed });
  };

  renderForm = () => {
    return (
      <>
        <GeneralInformationForm
          manualElementValue={this.state.manualMeasurement}
          handleChangeInput={this.handleChangeInput}
        />
      </>
    );
  };
}

export default EditRecord;

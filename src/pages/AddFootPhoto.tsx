import React, { Component } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonIcon,
  IonAlert,
} from "@ionic/react";
import "./css/AddingFoot.css";
import {
  CROP,
  MARK_POINT,
  PERSPECTIVE_LIST,
} from "../utils/constants/AcionType";
import ImagePerspectiveList from "../components/AddImage/ImagePerspectiveList";
import "react-image-crop/dist/ReactCrop.css";
import { TakeImage } from "../utils/TakeImage";
import { arrowBack } from "ionicons/icons";
import CropImage from "../components/AddImage/CropImage";
import MarkingFoot from "../components/AddImage/MarkingFoot";
import { ISoleFoot } from "../utils/interfaces/ISoleFoot";
import { ISideFoot } from "../utils/interfaces/ISideFoot";
import { LEFT, RIGHT } from "../utils/constants/FootSide";
import { SIDE, SOLE } from "../utils/constants/FootPerspectives";
import { Link, Redirect } from "react-router-dom";
import { CreateVolunteersOptions } from "../endpoints/CreateVolunteersOptions";
import Cookies from "universal-cookie";
import Alert from "../components/Alert";

interface IProps {
  location: {
    state: any;
  };
}
interface IState {
  showAlert: boolean;
  leftFeetList: { soles: ISoleFoot[]; sides: ISideFoot[] };
  rightFeetList: { soles: ISoleFoot[]; sides: ISideFoot[] };
  currentSelectedImage: {
    perspective: string | undefined;
    side: string | undefined;
    index: string | undefined;
  };
  selecttedFootside: string;
  childComponent: string;
  containerRect: DOMRect;
  backDropDismiss: boolean;
  fetchingMessage: string;
  showAlertFetching: boolean;
  redirect: boolean;
  showAlertError: boolean;
  alertTitle: string;
  errorText: string;
}

class AddFootPhoto extends Component<IProps, IState> {
  containerRef: React.RefObject<HTMLIonContentElement>;
  getRectInterval: any;
  constructor(props: IProps) {
    super(props);
    const defaultRect: DOMRect = new DOMRect();
    this.state = {
      selecttedFootside: LEFT,
      showAlert: false,
      currentSelectedImage: {
        perspective: undefined,
        side: undefined,
        index: undefined,
      },
      leftFeetList: { soles: [], sides: [] },
      rightFeetList: { soles: [], sides: [] },
      childComponent: PERSPECTIVE_LIST,
      containerRect: defaultRect,
      backDropDismiss: false,
      fetchingMessage: "Processing",
      showAlertFetching: false,
      redirect: false,
      showAlertError: false,
      alertTitle: "",
      errorText: "",
    };
    this.containerRef = React.createRef<HTMLIonContentElement>();
    this.getRectInterval = undefined;
  }

  componentDidMount() {
    const manualMeasurement = this.props.location.state;
    console.log(manualMeasurement);
    this.getRectInterval = setInterval(() => {
      this.setState((previousState): any => {
        const containerRect = this.containerRef.current?.getBoundingClientRect();
        return JSON.stringify(containerRect) ===
          JSON.stringify(previousState.containerRect)
          ? null
          : { containerRect };
      });
    }, 10);
  }

  componentWillUnmount() {
    clearInterval(this.getRectInterval);
  }

  addImageHandler = async (
    perspective: string,
    side: string,
    index: string | undefined
  ) => {
    await TakeImage(perspective)
      .then((result) => {
        if (index) {
          this.updateOrDeleteImage(perspective, side, index, result);
        } else {
          this.updateOrDeleteImage(perspective, side, undefined, result);
        }
      })
      .catch((error) => {
        this.setState({
          showAlertError: true,
          errorText: error,
          alertTitle: "Wrong dimension",
        });
      });
  };

  deleteHandler = (perspective: string, side: string, index: string) => {
    this.updateOrDeleteImage(perspective, side, index, undefined);
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
            this.setState((prvState) => ({
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
            this.setState((prvState) => ({
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
            this.setState((prvState) => ({
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
            this.setState((prvState) => ({
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
      childComponent: actionType,
    });
  };

  onSelectFootSide = (footSide: string) => {
    this.setState({ selecttedFootside: footSide });
  };

  onClickBackButton = () => {
    this.setState({ childComponent: PERSPECTIVE_LIST });
  };

  cropImageHandler = (image: string | undefined) => {
    const { side, perspective, index } = this.state.currentSelectedImage;
    if (side && perspective && index) {
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

  onDismissAlertFetching = () => {
    this.setState({ showAlertFetching: false });
    if (this.state.fetchingMessage === "Completed") {
      this.setState({ redirect: true });
      window.location.reload();
    }
  };

  onClickSubmission = async () => {
    const cookie = new Cookies();
    const manualMeasurement = this.props.location.state;
    const { leftFeetList, rightFeetList } = this.state;
    const endpoint = process.env.REACT_APP_END_POINTS||""
    console.log(endpoint)
    const email = cookie.get("email");
    await fetch(
      endpoint,
      CreateVolunteersOptions(
        manualMeasurement,
        leftFeetList,
        rightFeetList,
        email
      )
    ).then((response) => {
      if (response.ok) {
        this.setState({
          showAlertFetching: true,
          fetchingMessage: "Completed",
          backDropDismiss: true,
        });
      } else {
        this.setState({
          showAlertFetching: true,
          fetchingMessage: "Failed",
          backDropDismiss: true,
        });
      }
    });
  };

  renderChildComponent = () => {
    const { perspective, side, index } = this.state.currentSelectedImage;
    const footSide =
      side === LEFT ? this.state.leftFeetList : this.state.rightFeetList;
    switch (this.state.childComponent) {
      case PERSPECTIVE_LIST:
        return (
          <ImagePerspectiveList
            onClickSubmission={this.onClickSubmission}
            deleteHandler={this.deleteHandler}
            left={this.state.leftFeetList}
            right={this.state.rightFeetList}
            addImageHandler={this.addImageHandler}
            onClickItemActionHandler={this.onClickItemActionHandler}
            onSelectFootSide={this.onSelectFootSide}
            selectedFootSide={this.state.selecttedFootside}
          />
        );
      case CROP:
        if (perspective && side && index) {
          return (
            <CropImage
              cropImageHandler={this.cropImageHandler}
              originalImage={(footSide as any)[perspective][index].image.croped}
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
  };

  onDismissError = () => {
    this.setState({
      showAlertError: false,
      errorText: "",
      alertTitle: "",
    });
  };

  render() {
    return (
      <IonPage>
        <IonHeader translucent>
          <IonToolbar>
            <IonButtons slot="start">
              {this.state.childComponent === PERSPECTIVE_LIST ? (
                <Link
                  to={{
                    pathname: "/main/add_foot/",
                  }}
                >
                  <IonButton>
                    <IonIcon icon={arrowBack} />
                  </IonButton>
                </Link>
              ) : (
                <IonButton onClick={this.onClickBackButton}>
                  <IonIcon icon={arrowBack} />
                </IonButton>
              )}
            </IonButtons>
            <IonTitle>Add foot image</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent ref={this.containerRef} fullscreen>
          {this.renderChildComponent()}
          <IonAlert
            isOpen={this.state.showAlertFetching}
            backdropDismiss={this.state.backDropDismiss}
            onDidDismiss={() => this.onDismissAlertFetching()}
            header={"Submission"}
            message={this.state.fetchingMessage}
          />
          <Alert
            onDismissError={this.onDismissError}
            title={this.state.alertTitle}
            message={this.state.errorText}
            show={this.state.showAlertError}
          />
        </IonContent>
        {this.state.redirect && <Redirect to="/main/add_foot" />}
      </IonPage>
    );
  }
}

export default AddFootPhoto;

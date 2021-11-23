import React, { useRef } from "react";
import "react-image-crop/dist/ReactCrop.css";
import { IonButton, IonRow, IonCol, IonGrid } from "@ionic/react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

interface IProps {
  originalImage: string | undefined;
  cropImageHandler(
    image: string | undefined,
  ): void;
}

const CropImage: React.FC<IProps> = (props) => {
  const [base64Image, setBase64Image] = React.useState<string | undefined>(
    undefined
  );
  const image = new Image();
  if (props.originalImage) {
    image.src = props.originalImage;
  }

  const cropperRef = useRef<HTMLImageElement>(null);
  const onCrop = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    setBase64Image(cropper.getCroppedCanvas().toDataURL());
  };

  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          {props.originalImage && (
            <Cropper
              src={props.originalImage}
              style={{ height: 400, width: "100%" }}
              initialAspectRatio={1 / 1}
              guides={true}
              crop={onCrop}
              background={false}
              responsive={true}
              checkOrientation={false}
              ref={cropperRef}
            />
          )}
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          {base64Image && (
            <IonButton
              expand="block"
              onClick={() => {
                props.cropImageHandler(
                  base64Image,
                );
              }}
            >
              Crop
            </IonButton>
          )}
        </IonCol>
        <IonCol>
          <IonButton
            expand="block"
            onClick={() => {
              if (props.originalImage)
                props.cropImageHandler(
                  undefined,
                );
            }}
          >
            Reset
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default CropImage;

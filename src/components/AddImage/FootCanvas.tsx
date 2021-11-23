import React from "react";

const HOOK_SVG = "m 40 50 a 5 5 0 0 0 0 100 a 5 5 0 0 0 0 -100 z ";
const HOOK_PATH = new Path2D(HOOK_SVG);
const SCALE = 0.1;
const OFFSET = 80;

interface IProps {
  image: HTMLImageElement;
  imageScaleRatio: number;
  imageHeight: number;
  imageWidth: number;
  onClick: Function;
  componentMarkerPosition: { x: number; y: number };
}

const FootCanvas: React.FC<IProps> = (props) => {
  const [canvasPosition, setCanvasePosition] = React.useState({ x: 0, y: 0 });
  const [markerPosition, setMarkerPosition] = React.useState([{ x: 0, y: 0 }]);
  const canvasRef = React.useRef(null);
  const image = props.image ? props.image : new Image();

  React.useEffect(() => {
    const canvas: any = canvasRef.current;
    const context = canvas.getContext("2d");
    const interval = setInterval(() => {
      const position = {
        x: canvasPosition.x = canvas.getBoundingClientRect().x,
        y: canvasPosition.y = canvas.getBoundingClientRect().y,
      };
      setCanvasePosition(position);
      initialCanvasImage(context);
      const markerPosition = getMarkerPosition();
      markFootComponent(context, markerPosition, canvasPosition);
    }, 10);
    return () => clearInterval(interval);
  });

  const getMarkerPosition = () => {
    const lastestComponentMarkerPosition = props.componentMarkerPosition;
    const clickPosition = markerPosition[markerPosition.length - 1];

    const xClickPosition = Math.round(clickPosition.x / props.imageScaleRatio);
    const yClickPosition = Math.round(
      (clickPosition.y - canvasPosition.y) / props.imageScaleRatio
    );

    if (
      xClickPosition !== lastestComponentMarkerPosition.x ||
      yClickPosition !== lastestComponentMarkerPosition.y
    ) {
      clickPosition.x =
        lastestComponentMarkerPosition.x * props.imageScaleRatio;
      clickPosition.y =
        lastestComponentMarkerPosition.y * props.imageScaleRatio +
        canvasPosition.y;
    }
    return clickPosition;
  };

  const initialCanvasImage = (context: any) => {
    context.clearRect(0, 0, props.imageWidth, props.imageHeight);
    context.drawImage(image, 0, 0, props.imageWidth, props.imageHeight);
  };

  const markFootComponent = (context: any, location: any, position: any) => {
    context.fillStyle = "deepskyblue";
    context.save();
    context.scale(SCALE, SCALE);
    context.translate(
      location.x / SCALE - OFFSET,
      (location.y - position.y) / SCALE - OFFSET
    );
    context.fill(HOOK_PATH);
    context.restore();
  };

  const updateFootComponentPosition = (x: number, y: number) => {
    props.onClick(
      Math.round(x / props.imageScaleRatio),
      Math.round((y - canvasPosition.y) / props.imageScaleRatio)
    );
  };

  const onClickListener = (clickEvent: React.MouseEvent) => {
    const newPinLocation = { x: clickEvent.clientX, y: clickEvent.clientY };
    setMarkerPosition([...markerPosition, newPinLocation]);
    updateFootComponentPosition(newPinLocation.x, newPinLocation.y);
  };

  return (
    <canvas
      ref={canvasRef}
      width={props.imageWidth.toString()}
      height={props.imageHeight.toString()}
      onClick={(e) => {
        onClickListener(e);
      }}
    />
  );
};

export default FootCanvas;

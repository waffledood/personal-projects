import { useState } from "react";

const useDrag = ({ startingXCoord, startingYCoord }) => {
  const [dragInfo, setDragInfo] = useState({
    isDragging: false,
    origin: { x: 0, y: 0 },
    translation: { x: startingXCoord, y: startingYCoord },
    lastTranslation: { x: startingXCoord, y: startingYCoord },
  });

  const { isDragging } = dragInfo;

  const handleMouseDown = ({ clientX, clientY }) => {
    if (!isDragging)
      setDragInfo({
        ...dragInfo,
        isDragging: true,
        origin: { x: clientX, y: clientY },
      });
  };

  const handleMouseMove = ({ clientX, clientY }) => {
    if (isDragging) {
      const { origin, lastTranslation } = dragInfo;
      setDragInfo({
        ...dragInfo,
        translation: {
          x: clientX - origin.x + lastTranslation.x,
          y: clientY - origin.y + lastTranslation.y,
        },
      });
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      const { translation } = dragInfo;
      setDragInfo({
        ...dragInfo,
        isDragging: false,
        lastTranslation: { x: translation.x, y: translation.y },
      });
    }
  };

  const picturePosition = {
    position: "absolute",
    left: `${dragInfo.translation.x}px`,
    top: `${dragInfo.translation.y}px`,
  };

  return {
    picturePosition,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};

export default useDrag;

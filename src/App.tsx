import React, { useState, useRef, useEffect } from "react";
import { Rect, Stage, Layer, Group, Text } from "react-konva";
import Konva from "konva";

interface rectangle {
  x: number;
  y: number;
  id: string;
  width: number;
  height: number;
  text: string;
  isDragging: boolean;
}

const ArgumentCanvas = () => {
  const [canvasState, setCanvasState] = useState<rectangle[]>([
    {
      x: 300,
      y: 300,
      id: "1234",
      width: 100,
      height: 50,
      text: "Rectangle",
      isDragging: false,
    },
    {
      x: 400,
      y: 400,
      id: "1234234",
      width: 100,
      height: 50,
      text: "Rectangle",
      isDragging: false,
    },
  ]);

  const staticLayerRef = useRef<Konva.Layer>(null);
  const draggingLayerRef = useRef<Konva.Layer>(null);

  const handleDragStart = (event: Konva.KonvaEventObject<DragEvent>) => {
    const targetId = event.target.id();
    setCanvasState(
      canvasState.map((canvasObject) => {
        const { id, isDragging, ...rest } = canvasObject;

        return id === targetId
          ? {
              id,
              isDragging: true,
              ...rest,
            }
          : canvasObject;
      })
    );
    if (draggingLayerRef !== null && draggingLayerRef.current !== null) {
      event.target.moveTo(draggingLayerRef.current);
    }
  };

  const handleClick = (event: Konva.KonvaEventObject<DragEvent>) => {
    if (draggingLayerRef !== null && draggingLayerRef.current !== null) {
      event.target.moveTo(draggingLayerRef.current);
    }
  };

  const handleDragEnd = (event: Konva.KonvaEventObject<DragEvent>) => {
    const targetId = event.target.id();
    setCanvasState(
      canvasState.map((canvasObject) => {
        const { id, isDragging, ...rest } = canvasObject;

        return id === targetId
          ? {
              id,
              isDragging: false,
              ...rest,
            }
          : canvasObject;
      })
    );
  };

  return (
    <Stage
      height={1000}
      width={1000}
      onDblClick={handleClick}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Layer ref={staticLayerRef}>
        {canvasState
          .filter((item) => {
            return item.isDragging === false;
          })
          .map((item) => {
            return (
              <Group draggable id={item.id} x={item.x} y={item.y}>
                <Rect width={item.width} height={item.height} fill="grey" />
                <Text
                  text={item.text}
                  width={item.width}
                  height={item.height}
                  verticalAlign="middle"
                  align="left"
                />
              </Group>
            );
          })}
      </Layer>
      <Layer ref={draggingLayerRef}>
        {canvasState
          .filter((item) => {
            return item.isDragging === true;
          })
          .map((item) => {
            return (
              <Group draggable id={item.id} x={item.x} y={item.y}>
                <Rect width={item.width} height={item.height} fill="grey" />
                <Text
                  text={item.text}
                  width={item.width}
                  height={item.height}
                  verticalAlign="middle"
                  align="left"
                />
              </Group>
            );
          })}
      </Layer>
    </Stage>
  );
};

export default ArgumentCanvas;

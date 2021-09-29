import React, { useState } from "react";
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
  linecolor: string;
  fillcolor: string;
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
      linecolor: "black",
      fillcolor: "yellow",
    },
    {
      x: 400,
      y: 400,
      id: "1234234",
      width: 100,
      height: 50,
      text: "Rectangle",
      isDragging: false,
      linecolor: "black",
      fillcolor: "blue",
    },
  ]);

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
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Layer>
        {canvasState.map((item) => {
          return (
            <Group draggable id={item.id} x={item.x} y={item.y}>
              <Rect
                width={item.width}
                height={item.height}
                fill={item.fillcolor}
                stroke={item.linecolor}
              />
              <Text
                text={item.text}
                width={item.width}
                height={item.height}
                verticalAlign="middle"
                align="center"
              />
            </Group>
          );
        })}
      </Layer>
    </Stage>
  );
};

export default ArgumentCanvas;

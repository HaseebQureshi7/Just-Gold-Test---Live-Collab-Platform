import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Line } from "react-konva";
import Button from "./ui/Button";
import {
  ArrowClockwise,
  Broom,
  Chalkboard,
  Eraser,
  Upload,
} from "@phosphor-icons/react";
import Typography from "./ui/Typography";
import { RowFlex } from "../styles/utils/flexUtils";
import colors from "../styles/colors";
import { IRoom } from "../types/IRoom";
import { ICanvas } from "../types/ICanvas";
import { Socket } from "socket.io-client";
import useFetchLatestCanvas from "../hooks/useFetchLatestCanvas";
import useUpdateCanvas from "../hooks/useUpdateCanvas";

interface ICanvasProps {
  room: IRoom;
  socket: typeof Socket;
  canvas: ICanvas;
}

interface Stroke {
  points: number[];
  color: string;
  strokeWidth: number;
}

const backgroundColor = "whitesmoke";

const Canvas: React.FC<ICanvasProps> = ({ room, socket, canvas }) => {
  // Reference to the Konva stage
  const stageRef = useRef<any>(null);
  // Local state for strokes and current stroke being drawn
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);

  // Hooks to update and fetch canvas state from your DB (jsonb)
  const { mutate: syncCanvasState, isPending: syncCanvasStatus } =
    useUpdateCanvas();
  const { refetch, data: latestCanvasData } = useFetchLatestCanvas(canvas.id!);

  // Load initial canvas state from the DB (JSON)
  useEffect(() => {
    if (latestCanvasData) {
      try {
        const parsed = JSON.parse(latestCanvasData);
        if (parsed && Array.isArray(parsed.strokes)) {
          setStrokes(parsed.strokes);
        }
      } catch (error) {
        console.error("Failed to parse canvas data", error);
      }
    }
  }, [latestCanvasData]);

  // Listen for incoming canvas events from other users
  useEffect(() => {
    const handleCanvasStroke = ({
      roomId,
      stroke,
    }: {
      roomId: string;
      stroke: Stroke;
    }) => {
      if (roomId !== room.id) return;
      setStrokes((prev) => [...prev, stroke]);
    };

    const handleCanvasClear = ({ roomId }: { roomId: string }) => {
      if (roomId !== room.id) return;
      setStrokes([]);
    };

    const handleCanvasUpdate = async ({ roomId }: { roomId: string }) => {
      if (roomId !== room.id) return;
      await refetch();
      if (latestCanvasData) {
        try {
          const parsed = JSON.parse(latestCanvasData);
          if (parsed && Array.isArray(parsed.strokes)) {
            setStrokes(parsed.strokes);
          }
        } catch (error) {
          console.error("Failed to parse canvas data", error);
        }
      }
    };

    socket.on("canvas-stroke", handleCanvasStroke);
    socket.on("canvas-clear", handleCanvasClear);
    socket.on("canvas-update", handleCanvasUpdate);

    return () => {
      socket.off("canvas-stroke", handleCanvasStroke);
      socket.off("canvas-clear", handleCanvasClear);
      socket.off("canvas-update", handleCanvasUpdate);
    };
  }, [socket, room.id, refetch, latestCanvasData]);

  // Update the canvas state in your DB and notify others
  const updateCanvasState = (updatedStrokes: Stroke[]) => {
    const data = JSON.stringify({ strokes: updatedStrokes });
    syncCanvasState({ id: canvas.id, data });
    // Emit an event to notify other clients
    socket.emit("canvas-update", { roomId: room.id, canvasState: data });
  };

  // Drawing handlers using Konva pointer events
  const handlePointerDown = (_: any) => {
    setIsDrawing(true);
    const stage = stageRef.current;
    const pos = stage.getPointerPosition();
    const newStroke: Stroke = {
      points: [pos.x, pos.y],
      // Use backgroundColor if erasing; otherwise black.
      color: isErasing ? backgroundColor : "black",
      strokeWidth: isErasing ? 10 : 2,
    };
    setCurrentStroke(newStroke);
  };

  const handlePointerMove = (_: any) => {
    if (!isDrawing || !currentStroke) return;
    const stage = stageRef.current;
    const pos = stage.getPointerPosition();
    const newPoints = currentStroke.points.concat([pos.x, pos.y]);
    setCurrentStroke({ ...currentStroke, points: newPoints });
  };

  const handlePointerUp = () => {
    if (currentStroke) {
      const newStrokes = [...strokes, currentStroke];
      setStrokes(newStrokes);
      // Push this stroke to the DB and notify others
      updateCanvasState(newStrokes);
      socket.emit("canvas-stroke", { roomId: room.id, stroke: currentStroke });
    }
    setIsDrawing(false);
    setCurrentStroke(null);
  };

  // Clear the canvas completely
  const clearCanvas = () => {
    setStrokes([]);
    updateCanvasState([]);
    socket.emit("canvas-clear", { roomId: room.id });
  };

  // Toggle eraser mode (draw in background color)
  const toggleEraser = () => {
    setIsErasing((prev) => !prev);
  };

  return (
    <div 
    className="fade-in"
    style={{ width: "100%", height: "100%", position: "relative" }}>
      {/* Info Panel */}
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          color: syncCanvasStatus ? colors.primary : "grey",
          ...RowFlex,
          gap: "10px",
        }}
      >
        {syncCanvasStatus ? (
          <ArrowClockwise className="rotate-infinite" />
        ) : (
          <Chalkboard />
        )}
        <Typography>{syncCanvasStatus ? "Saving..." : room?.name}</Typography>
      </div>

      {/* Toolbar */}
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          borderRadius: "12.5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          zIndex: 999,
        }}
      >
        <Button
          onClick={toggleEraser}
          style={{ backgroundColor: isErasing ? colors.info : "black" }}
        >
          <Eraser />
        </Button>
        <Button onClick={clearCanvas}>
          <Broom />
        </Button>
        <Button onClick={() => updateCanvasState(strokes)}>
          <Upload />
        </Button>
      </div>

      {/* Collaborative Canvas using Konva */}
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        ref={stageRef}
        onMouseDown={handlePointerDown}
        onTouchStart={handlePointerDown}
        onMouseMove={handlePointerMove}
        onTouchMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onTouchEnd={handlePointerUp}
        style={{
          backgroundColor: backgroundColor,
          touchAction: "none",
          cursor: isErasing ? "cell" : "crosshair",
        }}
      >
        <Layer>
          {strokes.map((stroke, i) => (
            <Line
              key={i}
              points={stroke.points}
              stroke={stroke.color}
              strokeWidth={stroke.strokeWidth}
              lineCap="round"
              lineJoin="round"
            />
          ))}
          {currentStroke && (
            <Line
              points={currentStroke.points}
              stroke={currentStroke.color}
              strokeWidth={currentStroke.strokeWidth}
              lineCap="round"
              lineJoin="round"
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;

import { useParams } from "react-router-dom";
import Button from "../../components/ui/Button";
import { ColFlex } from "../../styles/utils/flexUtils";
import colors from "../../styles/colors";
import { ICanvas } from "../../types/ICanvas";
import useCreateCanvas from "../../hooks/useCreateCanvas";
import { Palette, PencilSimpleSlash } from "@phosphor-icons/react";
import { Socket } from "socket.io-client";

interface ICreateNewCanvasProps {
  setCurrentCanvas: (data: ICanvas | null) => void;
  setNoCanvasMode: (data: boolean) => void;
  socket: typeof Socket;
}

function CreateNewCanvas({
  setCurrentCanvas,
  setNoCanvasMode,
  socket,
}: ICreateNewCanvasProps) {
  const { id: roomId } = useParams();
  const { mutate: createCanvas, isPending } = useCreateCanvas({
    onSuccess: (data: ICanvas) => {
      setCurrentCanvas(data.data);
      socket.emit("new-canvas-start", { roomId: roomId });
    },
    onError: (error: Error) => {
      console.error("Error creating canvas:", error);
    },
  });

  const handleNoCanvasMode = () => {
    setNoCanvasMode(true);
    socket.emit("no-canvas-mode", { roomId: roomId });
  };

  const handleCreate = () => {
    if (!roomId) {
      console.error("Room ID not found!");
      return;
    }
    createCanvas({ roomId });
  };

  return (
    <div
      className="fade-in"
      style={{ ...ColFlex, width: "100%", height: "100%", gap: "25px" }}
    >
      <Button onClick={handleNoCanvasMode} disabled={isPending}>
        <PencilSimpleSlash size={18} />
        Start without a canvas
      </Button>
      <Button
        onClick={handleCreate}
        style={{ backgroundColor: colors.background, color: "black" }}
        disabled={isPending}
      >
        <Palette size={18} />
        {isPending ? "Creating..." : "Create a collaboration board?"}
      </Button>
    </div>
  );
}

export default CreateNewCanvas;

import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { createCanvas } from "../api/canvas/CreateCanvas";
import { ICanvas } from "../types/ICanvas";

interface CreateCanvasParams {
  roomId: string;
}

const useCreateCanvas = (
  options?: UseMutationOptions<ICanvas, Error, CreateCanvasParams>
) => {
  return useMutation<ICanvas, Error, CreateCanvasParams>({
    mutationFn: createCanvas,
    // You can provide default behavior here if desired
    ...options, // Overrides or additional options can be passed in
  });
};

export default useCreateCanvas;

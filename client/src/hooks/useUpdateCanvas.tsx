import { useMutation } from "@tanstack/react-query";
import { updateCanvas } from "../api/canvas/UpdateCanvas";

const useUpdateCanvas = () => {
  return useMutation({
    mutationFn: updateCanvas,
    onError: (error) => {
      console.log(error);
    },
  });
};

export default useUpdateCanvas;

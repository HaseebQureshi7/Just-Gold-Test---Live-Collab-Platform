import { ICanvas } from "../../types/ICanvas";
import { api } from "../api";

export const updateCanvas = async (newCanvasData: Partial<ICanvas>) => {
  try {
    const res = await api.patch(`/canvas/${newCanvasData.id}`, newCanvasData);
    return res.data;
  } catch (err: any) {
    console.error(
      "API Error: Canvas not updated!",
      err.response?.data || err.message
    );
    throw err;
  }
};

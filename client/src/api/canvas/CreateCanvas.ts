import { ICanvas } from "../../types/ICanvas";
import { api } from "../api";

export const createCanvas = async (canvasData: Partial<ICanvas>) => {
  try {
    const res = await api.post("/canvas", canvasData);
    return res.data;
  } catch (err: any) {
    console.error(
      "API Error: Canvas not created!",
      err.response?.data || err.message
    );
    throw err;
  }
};

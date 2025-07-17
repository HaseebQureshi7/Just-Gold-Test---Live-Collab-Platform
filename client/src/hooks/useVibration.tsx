// hooks/useVibration.ts

type VibrationType = "tap" | "success" | "error" | "info" | "warning";

const patterns: Record<VibrationType, number | number[]> = {
  tap: 20,
  success: [50, 50, 50], // buzz - pause - buzz - pause - buzz
  error: [60, 40, 60, 60, 50], // stronger and longer
  info: [60, 30, 60], // mild double buzz
  warning: [100, 50, 50], // buzz - pause - short buzz
};

export function useVibration() {
  const vibrate = (pattern: number | number[]) => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  };

  return {
    custom: vibrate,
    tap: () => vibrate(patterns.tap),
    success: () => vibrate(patterns.success),
    error: () => vibrate(patterns.error),
    info: () => vibrate(patterns.info),
    warning: () => vibrate(patterns.warning),
  };
}

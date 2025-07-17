import { useEffect, useState } from "react";

interface IScreenSize {
  width: number;
  category: "xs" | "sm" | "md" | "lg" | "xl";
}

const breakpoints = {
  xs: 480,
  sm: 768,
  md: 1024,
  lg: 1280,
  xl: 1536,
};

const getSizeCategory = (width: number) => {
  if (width < breakpoints.xs) return "xs";
  if (width < breakpoints.sm) return "sm";
  if (width < breakpoints.md) return "md";
  if (width < breakpoints.lg) return "lg";
  return "xl";
};

export function useResponsive() {
  const [screenSize, setScreenSize] = useState<IScreenSize>({
    width: window.innerWidth,
    category: getSizeCategory(window.innerWidth),
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize((prev) => {
        const newWidth = window.innerWidth;
        const newCategory = getSizeCategory(newWidth);
        return prev.category !== newCategory
          ? { width: newWidth, category: newCategory }
          : prev; // Avoid unnecessary updates
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
}

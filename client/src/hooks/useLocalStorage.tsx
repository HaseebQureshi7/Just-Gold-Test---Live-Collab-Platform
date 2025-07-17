import { useState } from "react";

function useLocalStorage<T>() {
  const [storedValue, setStoredValue] = useState<Record<string, T | null>>(() => {
    try {
      const allItems = { ...localStorage };
      const parsedItems: Record<string, T | null> = {};
      Object.keys(allItems).forEach((key) => {
        try {
          parsedItems[key] = JSON.parse(allItems[key]);
        } catch {
          parsedItems[key] = allItems[key] as T;
        }
      });
      return parsedItems;
    } catch (error) {
      console.error("Error accessing localStorage", error);
      return {};
    }
  });

  const setItem = (key: string, value: T | null | ((prev: T | null | undefined) => T | null)) => {
    try {
      const newValue = value instanceof Function ? value(storedValue[key]) : value;
      setStoredValue((prev) => ({ ...prev, [key]: newValue }));
      if (newValue === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
  };

  const getItem = (key: string): T | null => {
    return storedValue[key] ?? null;
  };

  return { getItem, setItem };
}

export default useLocalStorage;

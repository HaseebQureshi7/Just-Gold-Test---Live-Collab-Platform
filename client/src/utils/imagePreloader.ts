// src/utils/imagePreloader.ts
export const preloadImages = (imageUrls: string[]): Promise<boolean> => {
    return new Promise((resolve) => {
      let loadedCount = 0;
  
      imageUrls.forEach((src) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === imageUrls.length) resolve(true);
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === imageUrls.length) resolve(false);
        };
      });
    });
  };
  
import { useEffect, useState } from "react";
import { ColFlex } from "../../styles/utils/flexUtils";
import { preloadImages } from "../../utils/imagePreloader";
import LoadingPage from "../LoadingPage/LoadingPage";
import { useResponsive } from "../../hooks/useResponsive";

const images = [
  "/images/illustrations/illustration-0.gif",
  "/images/illustrations/illustration-1.gif",
  "/images/illustrations/illustration-2.gif",
  "/images/illustrations/illustration-3.gif",
  "/images/illustrations/illustration-4.gif",
];

function DashboardCarousel() {
  const [currImageIndex, setCurrImageIndex] = useState<number>(0);
  const [imagesLoaded, setImageLoaded] = useState<boolean>(false);

  const { category } = useResponsive();

  useEffect(() => {
    preloadImages(images).then(() => {
      setImageLoaded(true);
      const interval = setInterval(() => {
        setCurrImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 2000);

      return () => clearInterval(interval);
    });
  }, []);

  if (!imagesLoaded) return <LoadingPage width={"40%"} height={"350px"} />;

  return (
    <div
      className="fade-in"
      style={{
        width: category == "xs" ? "100%" :"40%",
        height: category == "xs" ? "350px" : "350px",
        ...ColFlex,
        // backgroundColor:"red",
        overflow: "hidden",
        marginTop: category == "xs" ? "25px": 0,
        aspectRatio: 1,
      }}
    >
      {/* upcoming / shadow image */}
      <img
        key={images[currImageIndex]}
        className={category == "xs" ? "" : "heart_beat_infinite"}
        src={images[currImageIndex]}
        style={{
          height: "250px",
          position: "absolute",
          filter: "brightness(0.5)",
          zIndex: "-1",
          marginTop: "50px",
          marginRight: "50px",
          borderRadius: "10px",
          backgroundColor: "lightgrey",
          boxShadow: "20px 10px 20px rgba(0, 0, 0, 0.5)",
        }}
      />
      {/* current image */}
      <img
        className={category == "xs" ? "" : "heart_beat_infinite"}
        key={images[currImageIndex + 1]}
        src={images[(currImageIndex + 1) % images.length]}
        style={{ height: "250px", width: "auto",
           borderRadius: "10px",
        scale: category == "xs" ? 0.9 : 1
      }}
      />
    </div>
  );
}

export default DashboardCarousel;

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ColFlex, PageFlex } from "../../styles/utils/flexUtils";
import { preloadImages } from "../../utils/imagePreloader";
import LoadingPage from "../LoadingPage/LoadingPage";
import { useUser } from "../../hooks/useUser";
import { useResponsive } from "../../hooks/useResponsive";
import Typography from "../../components/ui/Typography";

function LandingPage() {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const { category } = useResponsive();

  const navigate = useNavigate();
  const location = useLocation();

  // navigate to dashboard if the user exits
  const { user } = useUser();
  if (user) {
    // navigate("/dashboard");
    return;
  }

  // Preload images and Auto navigate to the next page
  useEffect(() => {
    preloadImages(["/images/huddle-logo-top.png"]).then((loaded) => {
      setImagesLoaded(loaded);

      setTimeout(() => {
        if (location.pathname == "/") {
          navigate("/login");
        }
      }, 3000);
    });
  }, []);

  if (!imagesLoaded) return <LoadingPage width={"100%"} height={"100dvh"} />;

  return (
    <div
      className="fade-in"
      style={{ ...PageFlex, alignItems: "center", justifyContent: "center" }}
    >
      <img
        className="heart_beat_infinite"
        style={{ width: category == "xs" ? "30%" : "10%", aspectRatio: "auto" }}
        src="/images/huddle-logo-top.png"
      />
      <div style={{ ...ColFlex }}>
        <Typography
          textProps={{ className: "gradient-text" }}
          styles={{ fontWeight: 600 }}
          size={2}
        >
          Huddle
        </Typography>
        <h5 style={{ fontWeight: 500, color: "grey" }}>
          Collaborative Space for creatives
        </h5>
      </div>
    </div>
  );
}

export default LandingPage;

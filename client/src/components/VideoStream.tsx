import { ColFlex, RowFlex } from "../styles/utils/flexUtils";
import colors from "../styles/colors";
import { useEffect, useRef } from "react";
import { SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";
import Button from "./ui/Button";
import Typography from "./ui/Typography";
import { useResponsive } from "../hooks/useResponsive";

interface IVideoStream {
  stream: MediaStream | null;
  userName: string;
  isMuted?: boolean;
  isCameraOn?: boolean;
  fullWidthMode: boolean;
}

function VideoStream({
  stream,
  userName,
  isMuted = false,
  isCameraOn = true,
  fullWidthMode
}: IVideoStream) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const {category} = useResponsive()

  // Always set the stream when it changes
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

// When isCameraOn changes to true, reattach the stream and wait for metadata before calling play()
useEffect(() => {
  if (isCameraOn && videoRef.current && stream) {
    videoRef.current.srcObject = stream;
    const videoEl = videoRef.current;
    const playVideo = () => {
      videoEl.play().catch((err) => console.error("Error playing video:", err));
    };
    videoEl.addEventListener("loadedmetadata", playVideo);
    return () => {
      videoEl.removeEventListener("loadedmetadata", playVideo);
    };
  }
}, [isCameraOn, stream]);


  const isSmallDevice = category == "md" || category == "xs"

  return (
    <div
      className="fade-in-fast"
      style={isSmallDevice ? {
        ...ColFlex,
        width: fullWidthMode ? "45%" : '50%',
        aspectRatio: fullWidthMode ? 1.25 :2,
        borderRadius: "12.5px",
        backgroundColor: colors.warning,
        position: "relative",
      } : {
        ...ColFlex,
        width: fullWidthMode ? "30%" : '100%',
        aspectRatio: fullWidthMode ? 1.25 :2,
        borderRadius: "12.5px",
        backgroundColor: colors.warning,
        position: "relative",
      }}
    >
      {isCameraOn ? (
        <>
          {/* Name & Status */}
          <div
            style={{
              position: "absolute",
              top: "5px",
              left: "5px",
              zIndex: 999,
              ...RowFlex,
              gap: "10px",
            }}
          >
            <Button style={{ padding: "5px 10px" }}>
              {isMuted ? <SpeakerSlash /> : <SpeakerHigh />}
              <Typography styles={{ fontWeight: 600, color: "grey" }}>
                {userName}
              </Typography>
            </Button>
          </div>

          {/* Video element */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted={isMuted} // Prevents local feedback
            style={{ width: "100%", height: "100%", borderRadius: "12.5px", objectFit:"cover", }}
          />
        </>
      ) : (
        <div style={{ ...ColFlex, width: "100%", height: "100%" }}>
          {isMuted ? (
            <SpeakerSlash weight="bold" />
          ) : (
            <SpeakerHigh weight="bold" />
          )}
          <Typography styles={{ fontWeight: 600 }}>{userName}</Typography>
        </div>
      )}
    </div>
  );
}

export default VideoStream;

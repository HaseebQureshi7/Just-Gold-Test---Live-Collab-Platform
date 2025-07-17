import { useNavigate, useParams } from "react-router-dom";
import Canvas from "../../components/Canvas";
import useGetRoom from "../../hooks/useGetRoom";
import useGetCanvasByRoomId from "../../hooks/useGetCanvasByRoomId";
import LoadingPage from "../LoadingPage/LoadingPage";
import NoRoomFound from "./NoRoomFound";
import Button from "../../components/ui/Button";
import {
  Confetti,
  CornersOut,
  Hand,
  MicrophoneSlash,
  PhoneDisconnect,
  VideoCameraSlash,
} from "@phosphor-icons/react";
import { ColFlex, RowFlex } from "../../styles/utils/flexUtils";
import colors from "../../styles/colors";
import { useEffect, useRef, useState } from "react";
import { ICanvas } from "../../types/ICanvas";
import CreateNewCanvas from "./CreateNewCanvas";
import { socketURL } from "../../config/baseURL";
import io, { Socket } from "socket.io-client";
import { useUser } from "../../hooks/useUser";
import VideoStreamingContainer from "./VideoStreamingContainer";
import { useAlert } from "../../hooks/useAlert";
import { IStreamOptions } from "../../types/IStreamOptions";
import { useResponsive } from "../../hooks/useResponsive";

function SessionPage() {
  const { id: room_id } = useParams();
  const {
    data: room,
    isLoading: roomLoading,
    refetch: checkRoomsExistance,
  } = useGetRoom(room_id!);
  const {
    data: existingCanvas,
    isPending: isFindingExistingCanvas,
    refetch: findCanvasAgain,
  } = useGetCanvasByRoomId(room_id!);

  const navigate = useNavigate();
  const { category } = useResponsive();

  const [currentCanvas, setCurrentCanvas] = useState<ICanvas | null>(null);
  const [noCanvasMode, setNoCanvasMode] = useState<boolean>(false);
  const [actionbarActive, setActionbarActive] = useState(false);

  const [streamOptions, setStreamOptions] = useState<IStreamOptions>({
    audio: true,
    video: true,
  });

  const [userOptions, setUserOptions] = useState({
    hasLeft: false,
  });

  const [noRoomFound, setNoRoomFound] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const res = await checkRoomsExistance();
      if (res.status == "error") {
        setNoRoomFound(true);
      } else findCanvasAgain();
    })();
  }, []);

  useEffect(() => {
    if (room && !isFindingExistingCanvas && existingCanvas) {
      setCurrentCanvas(existingCanvas);
    }
  }, [room, existingCanvas, isFindingExistingCanvas]);

  // Socket Setup
  const { user } = useUser();
  const socketRef = useRef<any>(null);
  const { showAlert, edgeGlow } = useAlert();
  // Use memberDetails instead of memberIds – each member has id and name
  const [memberDetails, setMemberDetails] = useState<
    Array<{ id: string; name: string }>
  >([]);

  const joinRoom = () => {
    if (room && user) {
      // Emit join-room along with user's id and name
      socketRef.current.emit("join-room", {
        roomId: room.id,
        userId: user.id,
        userName: user.name,
      });
    }
  };

  // Initialize socket connection
  useEffect(() => {
    socketRef.current = io(socketURL);
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // Join room when available
  useEffect(() => {
    if (room) {
      joinRoom();
    }
  }, [room]);

  useEffect(() => {
    const socket: typeof Socket = socketRef.current;

    socket.on("new-canvas-started", () => {
      // console.log("Canvas trigger received");
      findCanvasAgain(); // This will be your re-fetch/re-render logic
      showAlert("New board has been started", "info");
    });

    socket.on("no-canvas-mode", () => {
      console.log("NO CANVAS MODE!");
      setNoCanvasMode(true);
      showAlert("No canvas mode has been started", "info");
    });

    return () => {
      socket.off("new-canvas-started");
      socket.off("no-canvas-mode");
    };
  }, []);

  useEffect(() => {
    const handleRoomMembers = ({ members }: any) => {
      // memberDetails is the previous state (default to empty array if undefined)
      const oldMembers = memberDetails || [];

      // Find which members have left: those in oldMembers not in the new members list
      const leftMembers = oldMembers.filter(
        (old) => !members.some((m: any) => m.id === old.id)
      );

      // Find which members have joined: those in new members not in oldMembers
      const joinedMembers = members.filter(
        (m: any) => !oldMembers.some((old) => old.id === m.id)
      );

      leftMembers.forEach((member) => {
        showAlert(`${member.name} has left`, "error");
        edgeGlow("error");
      });

      joinedMembers.forEach((member: any) => {
        // Optionally, ignore showing alert if it's the current user
        if (member.name !== user?.name) {
          showAlert(`${member.name} has joined`, "info");
          edgeGlow("info");
        }
      });

      // Update state with new members
      setMemberDetails(members);
    };

    socketRef.current.on("room-members", handleRoomMembers);
    return () => {
      socketRef.current.off("room-members", handleRoomMembers);
    };
  }, [memberDetails, user, edgeGlow, showAlert]);

  // Floating Action Bar (FAB) control methods
  const toggleAudio = () => {
    showAlert("Audio off", "info");
    setStreamOptions((prev) => ({ ...prev, audio: !prev.audio }));
  };

  const toggleVideo = () => {
    if (streamOptions.video) {
      showAlert("Video off", "info");
      setStreamOptions((prev) => ({ ...prev, video: false }));
    } else {
      showAlert("Video on", "info");
      setStreamOptions((prev) => ({ ...prev, video: true }));
    }
  };

  const leaveSession = () => {
    showAlert("You left", "info");
    socketRef.current.disconnect();
    setUserOptions({
      hasLeft: true,
    });
    navigate("/dashboard");
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error enabling full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  if (roomLoading) {
    return <LoadingPage width="100dvw" height="100dvh" />;
  }
  if (noRoomFound) {
    return <NoRoomFound />;
  }

  return (
    <div
      className="fade-in"
      style={
        category == "xs"
          ? {
              ...ColFlex,
              width: "100dvw",
              height: "100dvh",
              alignItems: "flex-start",
              justifyContent: "space-between",
              backgroundColor: "black",
              padding: "10px",
              gap: "15px",
            }
          : {
              ...RowFlex,
              width: "100dvw",
              height: "100dvh",
              alignItems: "flex-start",
              justifyContent: "space-between",
              backgroundColor: "black",
              padding: "10px",
              gap: "15px",
            }
      }
    >
      {/* Canvas Section */}
      {!noCanvasMode && (
        <div
          style={{
            width: category == "xs" ? "100%" : "70%",
            height: "100%",
            border: "2px solid grey",
            borderRadius: "12.5px",
            overflow: "hidden",
          }}
        >
          {currentCanvas && room ? (
            <Canvas
              room={room}
              socket={socketRef.current}
              canvas={currentCanvas}
            />
          ) : (
            <CreateNewCanvas
              socket={socketRef.current}
              setNoCanvasMode={setNoCanvasMode}
              setCurrentCanvas={setCurrentCanvas}
            />
          )}
        </div>
      )}

      {/* Video Streams Section */}
      <VideoStreamingContainer
        fullWidthMode={noCanvasMode}
        userOptions={userOptions}
        memberDetails={memberDetails}
        socket={socketRef.current}
        room={room}
        user={user}
        streamOptions={streamOptions}
      />

      {/* Floating Action Bar / Controls */}
      <div
        onMouseEnter={() => setActionbarActive(true)}
        onMouseLeave={() => setActionbarActive(false)}
        style={{
          position: "absolute",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 999,
          width: category == "xs" ? "75%" : actionbarActive ? "40%" : "20%",
          backgroundColor: "rgba(150,150,150, 0.3)",
          backdropFilter: "blur(2px)",
          borderRadius: "12.5px",
          padding: "5px",
          transition: "all 0.4s",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Button title="Send Emoji">
          <Confetti
            style={{ transition: "all 0.4s" }}
            size={actionbarActive ? 25 : 15}
          />
        </Button>
        <Button
          title="Turn mic off"
          onClick={toggleAudio}
          style={{
            backgroundColor: streamOptions.audio ? "black" : colors.error,
          }}
        >
          <MicrophoneSlash
            style={{ transition: "all 0.4s" }}
            size={actionbarActive ? 25 : 15}
          />
        </Button>
        <Button
          title="Turn camera off"
          onClick={toggleVideo}
          style={{
            backgroundColor: streamOptions.video ? "black" : colors.error,
          }}
        >
          <VideoCameraSlash
            style={{ transition: "all 0.4s" }}
            size={actionbarActive ? 25 : 15}
          />
        </Button>
        <Button title="Raise Hand" style={{ backgroundColor: colors.warning }}>
          <Hand
            style={{ transition: "all 0.4s" }}
            size={actionbarActive ? 25 : 15}
          />
        </Button>
        <Button title="Full Screen" onClick={toggleFullScreen}>
          <CornersOut
            style={{ transition: "all 0.4s" }}
            size={actionbarActive ? 25 : 15}
          />
        </Button>
        <Button
          title="Leave Session"
          onClick={leaveSession}
          style={{ backgroundColor: colors.error }}
        >
          <PhoneDisconnect
            style={{ transition: "all 0.4s" }}
            size={actionbarActive ? 25 : 15}
          />
        </Button>
      </div>
    </div>
  );
}

export default SessionPage;

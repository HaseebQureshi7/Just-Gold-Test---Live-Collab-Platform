import { useEffect, useRef, useState } from "react";
import VideoStream from "../../components/VideoStream";
import { ColFlex } from "../../styles/utils/flexUtils";
import { IStreamOptions } from "../../types/IStreamOptions";
import { useResponsive } from "../../hooks/useResponsive";

// Using Google's STUN server
const ICE_SERVERS = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

interface MemberDetail {
  id: string;
  name: string;
}

interface IUserOptions {
  hasLeft: boolean;
}

interface VideoStreamingContainerProps {
  fullWidthMode: boolean;
  memberDetails: MemberDetail[];
  userOptions: IUserOptions;
  socket: any;
  room: any;
  user: any;
  streamOptions: IStreamOptions;
}

interface RemoteStatus {
  muted: boolean;
  videoOn: boolean;
}

function VideoStreamingContainer({
  fullWidthMode,
  memberDetails,
  userOptions,
  socket,
  room,
  user,
  streamOptions,
}: VideoStreamingContainerProps) {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<{ [key: string]: MediaStream }>({});
  const [remoteStatus, setRemoteStatus] = useState<{ [key: string]: RemoteStatus }>({});
  const peerConnections = useRef<{ [key: string]: RTCPeerConnection }>({});
  // ICE candidate queue: stores candidates until remoteDescription is set
  const iceCandidateQueue = useRef<{ [key: string]: RTCIceCandidateInit[] }>({});

  const { category } = useResponsive();

  // Get local video/audio stream (only once)
  useEffect(() => {
    const getLocalStream = async () => {
      try {
        const userStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setLocalStream(userStream);
      } catch (err) {
        console.error("Error accessing webcam:", err);
      }
    };

    getLocalStream();

    return () => {
      Object.values(peerConnections.current).forEach((pc) => pc.close());
      localStream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  // Update local tracks' enabled state when streamOptions change.
  useEffect(() => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = streamOptions.audio;
      });
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = streamOptions.video;
      });
      // Emit mute/video status to other peers.
      socket.emit("mute-status", {
        roomId: room.id,
        userId: user.id,
        muted: !streamOptions.audio,
      });
      socket.emit("video-status", {
        roomId: room.id,
        userId: user.id,
        videoOn: streamOptions.video,
      });
    }
  }, [streamOptions, localStream, socket, room, user]);

  // Listen for signaling messages from the socket (offer/answer/ice-candidate)
  useEffect(() => {
    if (!socket || !localStream || !room || !user) return;

    socket.on("offer", async ({ senderId, sdp }: any) => {
      if (senderId === user.id) return;
      let pc = peerConnections.current[senderId];
      if (!pc) {
        pc = new RTCPeerConnection(ICE_SERVERS);
        peerConnections.current[senderId] = pc;
        localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));
        pc.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit("ice-candidate", {
              roomId: room.id,
              senderId: user.id,
              receiverId: senderId,
              candidate: event.candidate,
            });
          }
        };
        pc.ontrack = (event) => {
          setRemoteStreams((prev) => ({
            ...prev,
            [senderId]: event.streams[0],
          }));
        };
      }
      // Set remote description for the incoming offer
      await pc.setRemoteDescription(new RTCSessionDescription(sdp));
      // Flush queued ICE candidates if any
      if (iceCandidateQueue.current[senderId]) {
        for (const queuedCandidate of iceCandidateQueue.current[senderId]) {
          try {
            await pc.addIceCandidate(new RTCIceCandidate(queuedCandidate));
          } catch (err) {
            console.error("Error adding queued ICE candidate", err);
          }
        }
        delete iceCandidateQueue.current[senderId];
      }
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.emit("answer", {
        roomId: room.id,
        senderId: user.id,
        receiverId: senderId,
        sdp: answer,
      });
    });

    socket.on("answer", async ({ senderId, sdp }: any) => {
      const pc = peerConnections.current[senderId];
      if (pc) {
        // Always set the remote description when an answer is received.
        await pc.setRemoteDescription(new RTCSessionDescription(sdp));
        // Flush queued candidates for this peer if any
        if (iceCandidateQueue.current[senderId]) {
          for (const queuedCandidate of iceCandidateQueue.current[senderId]) {
            try {
              await pc.addIceCandidate(new RTCIceCandidate(queuedCandidate));
            } catch (err) {
              console.error("Error adding queued ICE candidate", err);
            }
          }
          delete iceCandidateQueue.current[senderId];
        }
      }
    });

    socket.on("ice-candidate", async ({ senderId, candidate }: any) => {
      const pc = peerConnections.current[senderId];
      if (pc && candidate) {
        // If remote description is not set, queue the candidate
        if (!pc.remoteDescription) {
          if (!iceCandidateQueue.current[senderId]) {
            iceCandidateQueue.current[senderId] = [];
          }
          iceCandidateQueue.current[senderId].push(candidate);
        } else {
          try {
            await pc.addIceCandidate(new RTCIceCandidate(candidate));
          } catch (err) {
            console.error("Error adding received ICE candidate", err);
          }
        }
      }
    });

    return () => {
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
    };
  }, [socket, localStream, room, user]);

  // Listen for remote mute and video status updates
  useEffect(() => {
    if (!socket) return;
    socket.on("mute-status", ({ userId, muted }: any) => {
      setRemoteStatus((prev) => ({
        ...prev,
        [userId]: { ...(prev[userId] || { videoOn: true }), muted },
      }));
    });
    socket.on("video-status", ({ userId, videoOn }: any) => {
      setRemoteStatus((prev) => ({
        ...prev,
        [userId]: { ...(prev[userId] || { muted: false }), videoOn },
      }));
    });
    return () => {
      socket.off("mute-status");
      socket.off("video-status");
    };
  }, [socket]);

  // Create peer connections for new members and send offers
  useEffect(() => {
    if (!localStream || !socket || !room || !user) return;
    memberDetails.forEach((member) => {
      // Only create and send an offer if the current user’s ID is lower than the member’s.
      if (member.id !== user.id && user.id < member.id && !peerConnections.current[member.id]) {
        const pc = new RTCPeerConnection(ICE_SERVERS);
        peerConnections.current[member.id] = pc;
        localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));
        pc.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit("ice-candidate", {
              roomId: room.id,
              senderId: user.id,
              receiverId: member.id,
              candidate: event.candidate,
            });
          }
        };
        pc.ontrack = (event) => {
          setRemoteStreams((prev) => ({
            ...prev,
            [member.id]: event.streams[0],
          }));
        };
        pc.createOffer()
          .then((offer) => pc.setLocalDescription(offer))
          .then(() => {
            socket.emit("offer", {
              roomId: room.id,
              senderId: user.id,
              receiverId: member.id,
              sdp: pc.localDescription,
            });
          })
          .catch(console.error);
      }
    });

    // Cleanup: close connections for members no longer in the room.
    return () => {
      memberDetails.forEach((member) => {
        if (peerConnections.current[member.id]) {
          peerConnections.current[member.id].close();
          delete peerConnections.current[member.id];
        }
      });
    };
  }, [memberDetails, localStream, socket, room, user]);

  // When user leaves
  useEffect(() => {
    if (userOptions.hasLeft) {
      Object.values(peerConnections.current).forEach((pc) => pc.close());
      peerConnections.current = {};

      localStream?.getVideoTracks()[0].stop();
      setLocalStream(null);
      setRemoteStreams({});
      setRemoteStatus({});
    }
  }, [userOptions.hasLeft]);

  return (
    <div
      style={{
        ...ColFlex,
        flexDirection: fullWidthMode ? "row" : "column",
        width: category === "xs" || fullWidthMode ? "100%" : "30%",
        height: category === "xs" ? "75%" : "100%",
        justifyContent: fullWidthMode ? "space-evenly" : "flex-start",
        alignItems: fullWidthMode ? "flex-start" : "center",
        border: "2px solid grey",
        borderRadius: "12.5px",
        padding: category === "xs" ? "20px" : "10px",
        gap: category === "xs" || fullWidthMode ? "20px" : "10px",
        flexWrap: fullWidthMode ? "wrap" : category === "xs" ? "wrap" : "nowrap",
        overflowY: "scroll",
        scrollbarWidth: "thin",
      }}
    >
      {/* Local Video */}
      {localStream && (
        <VideoStream
          fullWidthMode={fullWidthMode}
          userName="You"
          stream={localStream}
          isMuted={true}
          isCameraOn={streamOptions.video}
        />
      )}
      {/* Remote Videos */}
      {memberDetails
        .filter((member) => member.id !== user.id)
        .map((member) => (
          <VideoStream
            key={member.id}
            fullWidthMode={fullWidthMode}
            userName={member.name}
            stream={remoteStreams[member.id] || null}
            isMuted={remoteStatus[member.id]?.muted ?? false}
            isCameraOn={remoteStatus[member.id]?.videoOn ?? true}
          />
        ))}
    </div>
  );
}

export default VideoStreamingContainer;

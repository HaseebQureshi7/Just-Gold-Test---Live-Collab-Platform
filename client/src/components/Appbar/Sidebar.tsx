import {
  GearSix,
  Question,
  SignOut,
  List,
  Sun,
  Moon,
  House,
  User,
} from "@phosphor-icons/react";
import colors from "../../styles/colors";
import Button from "../ui/Button";
import Typography from "../ui/Typography";
import LogoutModal from "./LogoutModal";
import { UseMutateFunction } from "@tanstack/react-query";
import { useState } from "react";
import { ColFlex, RowFlex } from "../../styles/utils/flexUtils";
import { CurrentDateTime } from "../../utils/CurrentDate";
import { useNavigate } from "react-router-dom";

interface ISidebar {
  logoutFn: UseMutateFunction;
  logoutPendingStatus: boolean;
  showLogoutModal: boolean;
  setShowLogoutModal: (data: boolean) => void;
}

function Sidebar({
  logoutFn,
  logoutPendingStatus,
  showLogoutModal,
  setShowLogoutModal,
}: ISidebar) {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  function toggleSidebar(): void {
    setIsOpen(!isOpen);
  }

  function GoToRoute(route: string): void {
    navigate(route);
  }

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {/* sidebar toggle */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "5px",
          cursor: "pointer",
          justifyContent: "flex-start",
          width: "100%",
          backgroundColor: colors.primary,
        }}
      >
        <Button
          onClick={toggleSidebar}
          style={{
            backgroundColor: "transparent",
            // padding: "10px",
          }}
        >
          <List weight="bold" size={30} />
        </Button>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            alignItems: "center",
            marginLeft: "auto",
          }}
        >
          <Typography
            size={1.25}
            styles={{
              fontWeight: 500,
              color: "white",
              display: "flex",
              flexDirection: "column",
              marginRight:"7.5px"
            }}
          >
            {CurrentDateTime().split("•")[0]}
            <Typography size={0.75}>
              {CurrentDateTime().split("•")[1]}
            </Typography>
          </Typography>
        </div>
      </div>

      {/* background */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: 0,
            width: "100dvw",
            height: "100dvh",
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(100, 100, 100, 0.2)",
            zIndex: 999,
            // one less than sidebar
          }}
          onClick={toggleSidebar} // optional: click outside to close
        />
      )}

      {/* contents */}
      <div
        style={{
          position: "absolute",
          top: 0,
          height: "100vh",
          width: "250px",
          backgroundColor: colors.background,
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          zIndex: 1000,
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            marginBottom: "30%",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              justifyContent: "flex-start",
            }}
          >
            <img
              src="/images/huddle-logo-top.png"
              style={{ width: "40px", aspectRatio: "auto" }}
            />
            <Typography
              textProps={{ className: "gradient-text" }}
              size={1.6}
              styles={{ fontWeight: 500 }}
            >
              Huddle
            </Typography>
          </div>
        </div>

        <div
          style={{
            ...ColFlex,
            width: "100%",
            gap: "16px",
            alignItems: "flex-start",
          }}
        >
          <Button
            onClick={() => GoToRoute("/dashboard")}
            tooltip="Your settings"
            style={{
              backgroundColor: "lightgray",
              color: "black",
              width: "100%",
              justifyContent: "flex-start",
            }}
          >
            <House size={18} />
            <Typography size={0.8}>Home</Typography>
          </Button>
          <Button
            onClick={() => GoToRoute("/app-settings")}
            tooltip="Your settings"
            style={{
              backgroundColor: "lightgray",
              color: "black",
              width: "100%",
              justifyContent: "flex-start",
            }}
          >
            <GearSix size={18} />
            <Typography size={0.8}>Settings</Typography>
          </Button>

          <Button
            onClick={() => GoToRoute("/help")}
            tooltip="Help"
            style={{
              backgroundColor: colors.info,
              color: "white",
              width: "100%",
              justifyContent: "flex-start",
            }}
          >
            <Question size={18} />
            <Typography size={0.8}>Help</Typography>
          </Button>
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "40px",
          }}
        >
          <div style={{ ...ColFlex, gap: "16px" }}>
            <Button
              onClick={() => GoToRoute("/user-settings")}
              tooltip="Account Settings"
              style={{
                backgroundColor: "lightgrey",
                color: "black",
                width: "100%",
                justifyContent: "flex-start",
              }}
            >
              <User size={18} />
              <Typography size={0.8}>Account</Typography>
            </Button>

            <Button
              tooltip="Logout"
              onClick={() => setShowLogoutModal(true)}
              style={{
                backgroundColor: colors.error,
                color: "white",
                width: "100%",
                justifyContent: "flex-start",
              }}
            >
              <SignOut size={18} />
              <Typography size={0.8}>Sign Out</Typography>
            </Button>
          </div>

          <div style={{ ...RowFlex }}>
            <div
              style={{
                display: "flex",
                position: "relative",
                backgroundColor: "#e0e0e0",
                borderRadius: "9999px",
                padding: "4px",
                width: "75%",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "4px",
                  left: "4px",
                  width: "50%",
                  height: "calc(100% - 8px)",
                  backgroundColor: colors.text,
                  borderRadius: "9999px",
                  transition: "all 0.3s ease",
                  zIndex: 0,
                }}
              />

              {/* Light Mode Button */}
              <Button
                tooltip="Light Mode"
                style={{
                  flex: 1,
                  backgroundColor: "transparent",
                  color: "#fff",
                  justifyContent: "center",
                  borderRadius: "9999px",
                  zIndex: 1,
                }}
              >
                <Sun size={18} weight="bold" />
              </Button>

              {/* Dark Mode Button */}
              <Button
                tooltip="Dark Mode"
                style={{
                  flex: 1,
                  backgroundColor: "transparent",
                  color: colors.text,
                  justifyContent: "center",
                  borderRadius: "9999px",
                  zIndex: 1,
                }}
              >
                <Moon size={18} weight="bold" />
              </Button>
            </div>
          </div>
        </div>

        <LogoutModal
          logoutStatus={logoutPendingStatus}
          showLogoutModal={showLogoutModal}
          setShowLogoutModal={setShowLogoutModal}
          logoutFn={logoutFn}
        />
      </div>
    </div>
  );
}

export default Sidebar;

import { GearSix, Question, SignOut } from "@phosphor-icons/react";
import { RowFlex } from "../../styles/utils/flexUtils";
import { CurrentDateTime } from "../../utils/CurrentDate";
import Button from "../ui/Button";
import Typography from "../ui/Typography";
import { useUser } from "../../hooks/useUser";
import colors from "../../styles/colors";
import useLogout from "../../hooks/useLogout";
import { useState } from "react";
import LogoutModal from "./LogoutModal";
import { useResponsive } from "../../hooks/useResponsive";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

function Appbar() {
  const { user } = useUser();

  const { category } = useResponsive();
  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const { mutate: logoutFn, isPending: logoutPendingStatus } = useLogout();

  const isMobile = category == "xs";

  if (isMobile) {
    return (
      <Sidebar
        logoutFn={logoutFn}
        showLogoutModal={showLogoutModal}
        logoutPendingStatus={logoutPendingStatus}
        setShowLogoutModal={setShowLogoutModal}
      />
    );
  }

  return (
    <div
      style={{
        ...RowFlex,
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "25px",
        padding: "15px",
      }}
    >
      {/* Logo bar */}
      <div style={{ minWidth: "125px", ...RowFlex, gap: "10px" }}>
        <img
          style={{ width: "60px", aspectRatio: "auto" }}
          src="/images/huddle-logo-top.png"
        />
        <Typography
          textProps={{ className: "gradient-text" }}
          size={1.85}
          styles={{ fontWeight: 500 }}
        >
          Huddle
        </Typography>
      </div>
      {/* current date */}
      <div
        style={{
          ...RowFlex,
          gap: "10px",
          marginLeft: "auto",
        }}
      >
        <Typography size={1.5} styles={{ fontWeight: 400, color: "grey" }}>
          {CurrentDateTime()}
        </Typography>
      </div>
      <div style={{ ...RowFlex, gap: "10px" }}>
        <Button
          onClick={() => navigate("/user-settings")}
          tooltip={`Your settings`}
        >
          <Typography size={0.8}>{user?.name}</Typography>
          <GearSix size={18} />
        </Button>

        <Button
          onClick={() => navigate("/help")}
          tooltip="help"
          style={{ backgroundColor: colors.primary }}
        >
          <Question size={18} />
        </Button>

        <Button
          tooltip="logout"
          onClick={() => setShowLogoutModal(true)}
          style={{ backgroundColor: colors.error }}
        >
          <SignOut size={18} />
        </Button>
      </div>
      <LogoutModal
        logoutStatus={logoutPendingStatus}
        showLogoutModal={showLogoutModal}
        setShowLogoutModal={setShowLogoutModal}
        logoutFn={logoutFn}
      />
    </div>
  );
}

export default Appbar;

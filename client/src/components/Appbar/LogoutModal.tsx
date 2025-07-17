import { UseMutateFunction } from "@tanstack/react-query";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import colors from "../../styles/colors";
import { ArrowLeft, UserCircleMinus } from "@phosphor-icons/react";
import { RowFlex } from "../../styles/utils/flexUtils";

interface ILogoutModal {
  showLogoutModal: boolean;
  setShowLogoutModal: (state: boolean) => void;
  logoutFn: UseMutateFunction;
  logoutStatus: boolean;
}

function LogoutModal({
  showLogoutModal,
  setShowLogoutModal,
  logoutFn,
  logoutStatus,
}: ILogoutModal) {
  return (
    <Modal
      modalState={{
        openModal: showLogoutModal,
        setOpenModal: setShowLogoutModal,
      }}
      title="Logout"
      subTitle="Are you sure ?"
    >
      <div
        style={{
          ...RowFlex,
          width: "100%",
          gap: "10px",
          justifyContent: "flex-end",
        }}
      >
        <Button
          tooltip="cancel"
          onClick={() => setShowLogoutModal(false)}
          style={{ backgroundColor: colors.info }}
        >
          <ArrowLeft size={18} />
          Go Back
        </Button>
        <Button
          isLoading={logoutStatus}
          tooltip="logout"
          onClick={() => logoutFn()}
          style={{ backgroundColor: colors.error }}
        >
          <UserCircleMinus size={18} />
          Log out of this device
        </Button>
      </div>
    </Modal>
  );
}

export default LogoutModal;

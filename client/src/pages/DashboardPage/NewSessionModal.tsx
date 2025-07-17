import { Presentation, Play } from "@phosphor-icons/react";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import TextField from "../../components/ui/TextField";
import colors from "../../styles/colors";
import { ColFlex, RowFlex } from "../../styles/utils/flexUtils";
import { FormEvent, useState } from "react";
import { useAlert } from "../../hooks/useAlert";
import useCreateRoom from "../../hooks/useCreateRoom";

interface INewSessionModal {
  openNewSessionModal: boolean;
  setOpenNewSessionModal: (state: boolean) => void;
}

function NewSessionModal({
  openNewSessionModal,
  setOpenNewSessionModal,
}: INewSessionModal) {
  const { showAlert, edgeGlow } = useAlert();

  const { mutate: createRoom, isPending } = useCreateRoom();
  const [sessionName, setSessionName] = useState<string>("");
  const CreateNewSession = (e: FormEvent) => {
    e.preventDefault();
    if (!sessionName) {
      showAlert("Session name is required!", "error");
      edgeGlow("error");
      return;
    }
    createRoom({ name: sessionName });
  };

  return (
    <Modal
      title="New Session"
      subTitle="Start a new collaboration session"
      modalState={{
        openModal: openNewSessionModal,
        setOpenModal: setOpenNewSessionModal,
      }}
    >
      <form
        onSubmit={CreateNewSession}
        style={{ ...ColFlex, width: "100%", gap: "20px" }}
      >
        {/* inputs */}
        <div style={{ ...ColFlex, width: "100%", gap: "5px" }}>
          <TextField
            // inputError={errors.has("sessionName")}
            title="Session Name"
            icon={<Presentation style={{ color: "grey" }} />}
            inputProps={{
              onChange: (e) => setSessionName(e.target.value),
              placeholder: "New session name",
              autoFocus: true,
              required: true,
            }}
          />
        </div>
        {/* Actions */}
        <div
          style={{
            ...RowFlex,
            justifyContent: "flex-end",
            width: "100%",
            gap: "15px",
          }}
        >
          <Button
            onClick={() => setOpenNewSessionModal(false)}
            style={{ backgroundColor: colors.error }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={isPending}
            style={{ backgroundColor: colors.primary }}
          >
            <Play />
            Start Session
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default NewSessionModal;

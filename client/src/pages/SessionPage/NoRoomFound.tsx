import { ColFlex } from "../../styles/utils/flexUtils";
import Typography from "../../components/ui/Typography";
import { ArrowFatLineLeft, CloudWarning } from "@phosphor-icons/react";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

function NoRoomFound() {
  const navigate = useNavigate();
  return (
    <div className="fade-in" style={{ ...ColFlex, width: "100dvw", height: "100dvh" }}>
      <CloudWarning size={75} />
      <Typography styles={{ marginTop: "10px" }} size={2}>
        ROOM NOT FOUND!
      </Typography>
      <Typography size={1}>This room was not found in the cloud!</Typography>
      <Button
        onClick={() => navigate("/dashboard")}
        style={{ gap: "10px", marginTop: "25px" }}
      >
        <ArrowFatLineLeft />
        Back to Dashboard
      </Button>
    </div>
  );
}

export default NoRoomFound;

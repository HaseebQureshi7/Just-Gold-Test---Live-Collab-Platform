import { ColFlex } from "../../styles/utils/flexUtils";
import Typography from "../../components/ui/Typography";
import { ArrowFatLineLeft, Monitor } from "@phosphor-icons/react";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../hooks/useAlert";
import { useEffect } from "react";

function NotFoundPage() {
  const navigate = useNavigate();
  const { edgeGlow } = useAlert();

  useEffect(() => {
    edgeGlow("error");
  }, []);

  return (
    <div
      className="fade-in"
      style={{ ...ColFlex, width: "100dvw", height: "100dvh" }}
    >
      <Monitor size={75} />
      <Typography styles={{ marginTop: "10px" }} size={2}>
        404 - PAGE NOT FOUND
      </Typography>
      <Typography size={1}>This page was not found on the server!</Typography>
      <Button
        onClick={() => navigate(-1)}
        style={{ gap: "10px", marginTop: "25px" }}
      >
        <ArrowFatLineLeft />
        Go Back
      </Button>
    </div>
  );
}

export default NotFoundPage;

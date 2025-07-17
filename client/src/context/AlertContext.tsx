import { createContext, useState, useRef } from "react";
import EdgeGlow from "../components/ui/EdgeGlow";
import Alert from "../components/ui/Alert";

interface AlertContextType {
  showAlert: (message: string, type: "success" | "error" | "info") => void;
  edgeGlow: (type: "success" | "error" | "info") => void;
}

export const AlertContext = createContext<AlertContextType | undefined>(
  undefined
);

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  const [glow, setGlow] = useState<"success" | "error" | "info" | null>(null);

  const alertTimeoutRef = useRef<any>(null);

  const showAlert = (message: string, type: "success" | "error" | "info") => {
    if (alertTimeoutRef.current) {
      clearTimeout(alertTimeoutRef.current);
    }

    setAlert({ message, type });

    alertTimeoutRef.current = setTimeout(() => {
      setAlert(null);
      alertTimeoutRef.current = null;
    }, 5000); // 5s auto-dismiss
  };

  const edgeGlow = (type: "success" | "error" | "info") => {
    setGlow(type);
    setTimeout(() => setGlow(null), 2000);
  };

  return (
    <AlertContext.Provider value={{ showAlert, edgeGlow }}>
      {children}

      {/* Edge Glow Effect */}
      {glow && <EdgeGlow status={glow} />}

      {/* Normal Bottom-Right Alert Notification */}
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
    </AlertContext.Provider>
  );
};

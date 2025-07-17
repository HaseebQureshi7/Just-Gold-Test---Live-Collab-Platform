import { useEffect, useState } from "react";
import { useVibration } from "../../hooks/useVibration";

interface IAlert {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  duration?: number; // Auto-dismiss time (ms)
  onClose?: () => void;
}

function Alert({ message, type = "info", duration = 5000, onClose }: IAlert) {
  const [visible, setVisible] = useState(true);
  const vibration = useVibration();

  // Trigger vibration based on type
  useEffect(() => {
    switch (type) {
      case "success":
        vibration.success();
        break;
      case "error":
        vibration.error();
        break;
      case "info":
        vibration.info();
        break;
      case "warning":
        vibration.warning();
        break;
    }
  }, [type]);

  // Auto-dismiss logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onClose?.(), 300); // Wait for fade-out
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div className={`alert alert-${type}`}>
      <span>{message}</span>
      <button className="close-btn" onClick={() => setVisible(false)}>
        ✖
      </button>
    </div>
  );
}

export default Alert;

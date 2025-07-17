import { useEffect, useState } from "react";

interface EdgeGlowProps {
  status: "success" | "error" | "info";
}

const EdgeGlow = ({ status }: EdgeGlowProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 1500); // Auto-hide after 1.5s
    return () => clearTimeout(timer);
  }, [status]);

  return <div className={`edge-glow ${status} ${visible ? "active" : ""}`} />;
};

export default EdgeGlow;

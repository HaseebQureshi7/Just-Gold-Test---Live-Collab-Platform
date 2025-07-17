import { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import Loading from "./Loading";
import { ColFlex, RowFlex } from "../../styles/utils/flexUtils";
import { useVibration } from "../../hooks/useVibration";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  tooltip?: string;
  style?: CSSProperties;
  fullWidth?: boolean;
}

function Button({
  children,
  isLoading = false,
  disabled = false,
  onClick,
  tooltip,
  style,
  fullWidth = false,
  ...rest
}: IButton) {
  const vibrate = useVibration();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    vibrate.tap();

    // Call the user's onClick
    onClick?.(e);
  };

  return (
    <button
      title={tooltip}
      className="button"
      disabled={disabled}
      onClick={handleClick}
      style={{
        ...RowFlex,
        gap: "10px",
        width: fullWidth ? "100%" : "auto",
        padding: "12.5px",
        //   backgroundColor: "#36C1C1",
        backgroundColor: "black",
        color: "white",
        border: "none",
        filter: disabled ? "brightness(0.7)" : "none",
        cursor: disabled ? "not-allowed" : "pointer",
        borderRadius: "7.5px",
        fontWeight: 500,
        ...style,
      }}
      type="button"
      {...rest}
    >
      {isLoading ? (
        <div
          style={{
            ...ColFlex,
          }}
        >
          <Loading />
        </div>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;

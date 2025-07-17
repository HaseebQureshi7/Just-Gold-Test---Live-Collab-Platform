import {
  CSSProperties,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
} from "react";
import { ColFlex, RowFlex } from "../../styles/utils/flexUtils";

interface IButton {
  title: string;
  noLabel?: boolean;
  icon?: ReactNode;
  inputError?: boolean;
  parentProps?: InputHTMLAttributes<HTMLDivElement>;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  parentStyles?: CSSProperties;
  labelStyles?: CSSProperties;
  inputStyles?: CSSProperties;
}

function TextField({
  title,
  icon,
  inputError=false,
  noLabel = false,
  parentProps,
  labelProps,
  inputProps,
  inputStyles,
  labelStyles,
  parentStyles,
}: IButton) {
  return (
    <div
      style={{
        ...ColFlex,
        width: "100%",
        alignItems: "flex-start",
        gap: "5px",
        ...parentStyles,
      }}
      {...parentProps}
    >
      {!noLabel && (
        <label {...labelProps} style={{ fontSize: "0.9rem", ...labelStyles }}>
          {title}
        </label>
      )}
      <div
        style={{
          ...RowFlex,
          width: "100%",
          gap: "5px",
          padding: icon ? "0 0px 0px 10px" : "0",
          borderRadius: "7.5px",
          border: inputError ? "2px solid crimson" : "none",
          backgroundColor: "#ececec",
        }}
      >
        {icon && icon}
        <input
          style={{
            width: "100%",
            padding: "12.5px",
            borderRadius: "7.5px",
            border: "none",
            backgroundColor: "#ececec",
            outline: "none",
            ...inputStyles,
          }}
          type="text"
          {...inputProps}
        />
      </div>
    </div>
  );
}

export default TextField;

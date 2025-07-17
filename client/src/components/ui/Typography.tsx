import { CSSProperties, HTMLAttributes, ReactNode } from "react";

interface ITypography {
  children: ReactNode;
  size?: number;
  styles?: CSSProperties;
  textProps?: HTMLAttributes<HTMLHeadingElement>
}

function Typography({ children, styles, size=1, textProps }: ITypography) {
  return (
    <div {...textProps} style={{ fontSize: size + "rem", ...styles }}>
      {children}
    </div>
  );
}

export default Typography;

import { CSSProperties } from "react"

export const ColFlex:CSSProperties = {
    display: "flex",
    flexDirection:"column",
    justifyContent: "center",
    alignItems: "center",
}

export const RowFlex:CSSProperties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
}

export const PageFlex:CSSProperties = {
    width: "100%",
    minHeight: "100dvh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "25px"
}

export const LayoutFlex:CSSProperties = {
    width: "100dvw",
    minHeight: "100dvh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: "25px"
}
import type { CSSProperties } from "react";


export const buttonResetStyle: CSSProperties = {
  border: "none",
  background: "none",
  padding: 0,
  margin: 0,
  font: "inherit",
  color: "inherit",
  textAlign: "inherit",
  width: "100%",
  cursor: "pointer",
  WebkitTapHighlightColor: "transparent",
};

export const pressableBaseStyle: CSSProperties = {
  display: "block",
  transition: "opacity 0.12s ease",
};

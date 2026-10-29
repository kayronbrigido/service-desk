import type { CSSProperties } from "react";

export const buttonIconBaseStyle: CSSProperties = {
  backgroundColor: "var(--color-primary)",
  color: "var(--color-text)",
  border: "none",
  padding: "1rem",
  borderRadius: "0.4rem",
  cursor: "pointer",
  transition: "background-color 0.2s ease",
  display: "inline-flex",
  alignItems: "center",
  gap: "0.5rem",
};

export const buttonIconHoverStyle: CSSProperties = {
  backgroundColor: "var(--color-primary-hover)",
};

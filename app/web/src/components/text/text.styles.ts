import type { CSSProperties } from "react";

export type TextVariant =
  | "title"
  | "subtitle"
  | "body"
  | "caption"
  | "button"
  | "label";

export const textBaseStyle: CSSProperties = {
  margin: 0,
  padding: 0,
};

export const textToolTipStyle: CSSProperties = {
  margin: 0,
  padding: 0,
};

export const textVariantStyles: Record<TextVariant, CSSProperties> = {
  title: { fontSize: "2rem", fontWeight: 700 },
  subtitle: { fontSize: "1.5rem", fontWeight: 600 },
  body: { fontSize: "1rem", fontWeight: 400 },
  caption: { fontSize: "0.875rem", fontWeight: 400, opacity: 0.8 },
  button: { fontSize: "1rem", fontWeight: 600, textTransform: "uppercase" },
  label: { fontSize: "0.9rem", fontWeight: 500 },
};

export const textAlignStyles = {
  left: { textAlign: "left" as const },
  center: { textAlign: "center" as const },
  right: { textAlign: "right" as const },
};

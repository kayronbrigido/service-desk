"use client";

import { ReactNode, useState } from "react";
import { buttonIconBaseStyle, buttonIconHoverStyle } from "./button-icon.styles";
import { mergeStyles } from "@src/utils/merge-styles";

type ButtonIconProps = {
  icon: ReactNode;
  text: string;
  onClick: () => void;
  isActive?: boolean;
};

export function ButtonIcon({ icon, text, onClick, isActive }: ButtonIconProps) {
  const [hover, setHover] = useState(false);
  const isHighlighted = Boolean(isActive) || hover;

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={mergeStyles(
        buttonIconBaseStyle,
        isHighlighted ? buttonIconHoverStyle : undefined
      )}
    >
      <span>{icon}</span>
      <span>{text}</span>
    </button>
  );
}

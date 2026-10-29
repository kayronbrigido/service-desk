"use client";

import { useCallback, useState } from "react";
import type { CSSProperties, MouseEventHandler } from "react";
import { mergeStyles } from "@src/utils/merge-styles";
import { Container } from "../container/container";
import * as styles from "./touchable-opacity.styles";

export type TouchableOpacityProps = {
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  containerStyle?: CSSProperties;
  style?: CSSProperties;
  activeOpacity?: number;
};

export function TouchableOpacity({
  children,
  onClick,
  containerStyle,
  style,
  activeOpacity = 0.2,
}: TouchableOpacityProps) {
  const [pressed, setPressed] = useState(false);

  const endPress = useCallback(() => setPressed(false), []);

  const buttonStyle = mergeStyles(
    styles.buttonResetStyle,
    styles.pressableBaseStyle,
    { opacity: pressed ? activeOpacity : 1 },
    style
  );

  return (
    <button
      type="button"
      onClick={onClick}
      style={buttonStyle}
      onPointerDown={() => setPressed(true)}
      onPointerUp={endPress}
      onPointerLeave={endPress}
      onPointerCancel={endPress}
    >
      <Container style={containerStyle}>{children}</Container>
    </button>
  );
}

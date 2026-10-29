"use client";

import React, { useState } from "react";
import {
  textBaseStyle,
  textVariantStyles,
  textAlignStyles,
  type TextVariant,
} from "./text.styles";
import { mergeStyles } from "@src/utils/merge-styles";

export type { TextVariant };

export interface TextModel {
  style?: React.CSSProperties
  children: string | React.ReactNode;
  variant?: TextVariant;
  color?: string;
  weight?: "normal" | "medium" | "bold" | "900" | "500" | "100" | "200" | "300" | "400" | "600" | "700";
  align?: "left" | "center" | "right";
  fontSize?: "xxsmall" | "xsmall" | "small" | "normal" | "large" | "xlarge" | "xxlarge"
  title?: string
}

export const Text: React.FC<TextModel> = ({
  children,
  variant = "body",
  color,
  weight,
  align,
  style,
  fontSize,
  title
}: TextModel) => {
  function getFontSize() {
    switch (fontSize) {
      case "xxsmall":
        return '9px'
      case "xsmall":
        return '12px'
      case "normal":
        return '15px'
      case "large":
        return '18px'
      case "xlarge":
        return '21px'
      case "xxlarge":
        return '24px'

      default:
        return '15px'
    }
  }
  const styles = mergeStyles(
    textBaseStyle,
    textVariantStyles[variant],
    align ? textAlignStyles[align] : undefined,
    { color, fontWeight: weight, fontSize: getFontSize() },
    style
  );

  return <p title={title} style={styles}>{children}</p>;
};

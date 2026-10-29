import type { HTMLAttributes } from "react";
import { containerStyle } from "./container.styles";
import { mergeStyles } from "@src/utils/merge-styles";

type ContainerProps = {
  children: React.ReactNode;
} & Pick<
  HTMLAttributes<HTMLDivElement>,
  | "style"
  | "id"
  | "role"
  | "aria-label"
  | "onMouseEnter"
  | "onMouseLeave"
  | "title"
>;

export function Container({
  children,
  style,
  id,
  role,
  "aria-label": ariaLabel,
  onMouseEnter,
  onMouseLeave,
  title
}: ContainerProps) {
  return (
    <div
      title={title}
      id={id}
      role={role}
      aria-label={ariaLabel}
      style={mergeStyles(containerStyle, style)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
}

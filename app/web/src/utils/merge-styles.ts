import type { CSSProperties } from "react";

/** Combina objetos de estilo inline (últimos sobrescrevem chaves iguais). */
export function mergeStyles(
  ...parts: (CSSProperties | undefined | null | false)[]
): CSSProperties {
  return Object.assign({}, ...parts.filter(Boolean) as CSSProperties[]);
}

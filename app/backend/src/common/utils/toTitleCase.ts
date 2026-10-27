import { normalizeSpaces } from './normalizeSpaces';

export function toTitleCase(
  text: string,
  options?: { normalizeBefore?: boolean; preserveAcronyms?: boolean },
): string {
  if (!text) return text;
  const { normalizeBefore = true, preserveAcronyms = true } = options || {};
  const input = normalizeBefore ? normalizeSpaces(text) : text;

  return input
    .split(' ')
    .map((word) => {
      if (!word) return word;

      if (!/[A-Za-zÀ-ÖØ-öø-ÿ]/.test(word)) return word;

      if (preserveAcronyms && word.length > 1 && word === word.toUpperCase()) {
        return word;
      }

      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

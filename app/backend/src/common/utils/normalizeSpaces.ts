export function normalizeSpaces(text: string): string {
  return text.trim().replace(/\s+/g, ' ');
}
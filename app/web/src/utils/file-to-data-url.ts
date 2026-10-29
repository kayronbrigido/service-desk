import { fileToBase64 } from "./file-to-base64";

export async function fileToDataUrl(file: File): Promise<string> {
  const base64 = await fileToBase64(file);
  return `data:${file.type};base64,${base64}`;
}
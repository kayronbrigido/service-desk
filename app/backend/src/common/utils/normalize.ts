import { Metadata } from "src/common/types/metadata.type";

export function normalizeError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}

export function normalizeMetadata(payload: unknown): Metadata {
  let value = payload;

  if (typeof value === "string") {
    value = JSON.parse(value);
  }

  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value)
  ) {
    throw new Error("Metadata must be a JSON object");
  }

  return value as Metadata;
}
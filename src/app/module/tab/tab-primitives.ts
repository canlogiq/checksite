import type { ReactNode } from "react";

export function tab(key: string, label: ReactNode, content?: ReactNode) {
  return { key, label, content }
}
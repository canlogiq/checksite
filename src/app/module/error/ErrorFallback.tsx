"use client"

import { use, type ReactNode } from "react"
import type { ErrorInfo } from "./error-primitives"

export function ErrorFallback<T extends object>(props: {
  await: Promise<{ error: ErrorInfo, display: ReactNode } | T>,
  children?: ReactNode
}) {
  const res = use(props.await)
  if ("display" in res) return res.display

  if ("error" in res) return null

  return props.children
}
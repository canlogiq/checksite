import { AppError } from "../module/error/error-primitives"

export function parseUrlFromQuery(query: string | string[] | undefined) {
  if (!query) return null

  let inferredUrl = Array.isArray(query) ? query[0] : query

  if (inferredUrl.startsWith("localhost")) {
    inferredUrl = "http://" + inferredUrl
  }
  if (inferredUrl.startsWith(":")) {
    inferredUrl = "http://localhost" + inferredUrl
  }
  if (!inferredUrl.startsWith("http")) {
    inferredUrl = "http://" + inferredUrl
  }

  const rawUrl = inferredUrl

  if (
    !rawUrl.startsWith("http://") &&
    !rawUrl.startsWith("https://") &&
    !rawUrl.startsWith("localhost:")
  ) {
    throw new AppError(new Error(), "input", "Invalid URL", "URL must have valid protocol with http:// or https:// - or no protocol at all", [])
  }

  try {
    const tempParsedURL = new URL(rawUrl)
    return tempParsedURL
  } catch (error) {
    throw new AppError(new Error(), "input", "Invalid URL", "URL must start with http:// or https://", [JSON.stringify(error)])
  }

}
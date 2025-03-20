import imageSize from "image-size";

export async function getImageSizeFromResponse(response: Response) {
  let errorMessage = ""

  const abuf = await response.arrayBuffer().catch(error => {
    errorMessage = error.message
    return undefined
  })
  if (!abuf) return { arrayBufferError: true, error: `Error fetching image buffer from url. ${ errorMessage }` }

  const buffer = (() => {
    try {
      return Buffer.from(abuf)
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : "Unknown error"
      return undefined
    }
  })()
  if (!buffer) return { bufferError: true, error: `Error converting to buffer. ${ errorMessage }` }

  const imageSizeRes = (() => {
    try {
      return imageSize(buffer)
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : "Unknown error"
      return undefined
    }
  })()
  if (!imageSizeRes) return { imageSizeError: true, error: `Error getting image size. ${errorMessage}` }

  return { imageSize: imageSizeRes, buffer }


}
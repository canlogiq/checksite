/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client"

import { useEffect, useRef, useState, type ComponentProps, type ReactNode } from "react";

export function AppImage(
  { firstFrameGif, src, onErrorFallback, ...props }: ComponentProps<'img'> & {
    firstFrameGif?: boolean,
    onErrorFallback?: ReactNode
  }
) {
  const [error, setError] = useState(false) 

  const usingProxyRef = useRef(false)
  
  // if (!src) return null
  if (firstFrameGif) {
    return <AppImageFirstFrameGif src={src ? `/api/proxy-img?url=${ encodeURIComponent(src) }` : undefined} {...props as ComponentProps<"canvas">} />
  }

  if (error && onErrorFallback) {
    console.log("Hello???")
    return onErrorFallback
  }

  return <img
    {...props}
    alt={props.alt || ""}
    // src={src}
    src={src ? `/api/proxy-img?url=${ encodeURIComponent(src) }` : undefined}
    onError={e => {
      if (!usingProxyRef.current && src) {
        e.currentTarget.src = src
        usingProxyRef.current = true
      } else {
        console.error("Failed to load image", src)
        setError(true)
      }
    }}
  />;

}

function AppImageFirstFrameGif(
  { src, ...props }: ComponentProps<'canvas'> & {
    src?: string
  }
) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return

    const ctx = canvas.getContext("2d");
    if (!ctx) return

    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
  }, [src])

  return (
    <>
      <img ref={imgRef} src={src} style={{ display: "none"}} />
      <canvas {...props} ref={canvasRef} />
    </>
  )
}
"use client"

import { px } from "@/app/lib/unit";
import { cn } from "lazy-cn";
import { useLayoutEffect, useRef, useState, type ComponentProps, type MouseEvent, type ReactNode } from "react";

export function TabList(
  { tabs, initialTab, className, onTabChange, ...props }: ComponentProps<"div"> & {
    tabs: ({ key: string, label: ReactNode, content?: ReactNode })[],
    initialTab?: () => number,
    onTabChange?: (label: {
      key: string;
      label: ReactNode;
      content?: ReactNode;
    }, index: number, e: MouseEvent<HTMLDivElement>) => void,
  }
) {
  const [tabNum, setTab] = useState<number | null>(initialTab ?? null)
  const tab = tabNum !== null ? tabs[tabNum] : null

  // Animation
  const indicatorRef = useRef<HTMLDivElement>(null)
  const rectRef = useRef({
    x: null as number | null,
    w: null as number | null,
  })

  useLayoutEffect(() => {
    if (!indicatorRef.current) return

    const indicator = indicatorRef.current
    const
      currRect = indicator.getBoundingClientRect(),
      prevX = rectRef.current.x,
      currX = currRect.left,
      prevW = rectRef.current.w,
      currW = currRect.width
    if (!prevX || !currX || !prevW || !currW) return
    const a = indicator.animate([
      { translate: px(prevX - currX), width: px(prevW) },
      { translate: px(0), width: px(currW) }
    ], {
      duration: 150,
      fill: "forwards",
      easing: "ease-in-out",
    })
    a.onfinish = () => a.cancel()
  }, [tabNum])

  return (
    <div className={cn('tab', className)} {...props} >
      {tabs.map((label, index) => (
        <div key={label.key}
          data-active={tab?.key === label.key ? "" : undefined}
          onClick={(e) => {
            const rect = indicatorRef.current?.getBoundingClientRect()
            rectRef.current.x = rect?.left ?? null
            rectRef.current.w = rect?.width ?? null
            setTab(index)
            onTabChange?.(label, index, e)
          }}
          className={"relative group tab-item"}
        >
          {label.label}
          {tab === label && <div ref={indicatorRef}
            className={cn("tab-background")}
          />}
        </div>
      ))}
    </div>
  )
}
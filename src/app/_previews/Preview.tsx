import { cn } from "lazy-cn";
import type { ReactNode } from "react";
import type { ComponentProps, SVGProps } from "react";

export function PreviewInfo(
  props: ComponentProps<"div">
) {
  return (
    <div {...props} className={cn("max-w-100", props.className)}>
      {props.children}
    </div>
  )
}

export type PreviewMessages = [
  level: 'error' | 'warn' | 'info',
  text: string
][]

export function MessageList(
  props: { messages: PreviewMessages }
) {
  return (
    <div className="flex flex-col gap-2 text-base pt-2 leading-tight">
      {
        props.messages.map((item, i) => (
          <div key={i}
            style={{
              animationDelay: `${ (i + 3) * 100 }ms`
            }}
            className={cn("flex items-start gap-1 fadeIn-0",
              item[0] === "error" && "text-error",
              item[0] === "warn" && "text-warning",
              item[0] === "info" && "text-foreground-muted-2",
              "[&_svg]:opacity-60"
            )}>
            {
              item[0] === "error" &&
              <ClarityExclamationCircleSolid className="w-5 h-5 translate-y-[-0.05rem] shrink-0" />
            }
            {
              item[0] === "warn" &&
              <ClarityExclamationTriangleSolid className="w-5 h-5 translate-y-[-0.05rem] shrink-0" />
            }
            {
              item[0] === "info" &&
              <ClarityInfoCircleLine className="w-5 h-5 translate-y-[-0.05rem] shrink-0" />
            }
            <span className="text">
              {item[1]}
            </span>
          </div>
        ))
      }
    </div>
  )
}



export function ClarityInfoCircleLine(props: SVGProps<SVGSVGElement>) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36" {...props}><circle cx="17.93" cy="11.9" r="1.4" fill="currentColor" className="clr-i-outline clr-i-outline-path-1"></circle><path fill="currentColor" d="M21 23h-2v-8h-3a1 1 0 0 0 0 2h1v6h-2a1 1 0 1 0 0 2h6a1 1 0 0 0 0-2" className="clr-i-outline clr-i-outline-path-2"></path><path fill="currentColor" d="M18 6a12 12 0 1 0 12 12A12 12 0 0 0 18 6m0 22a10 10 0 1 1 10-10a10 10 0 0 1-10 10" className="clr-i-outline clr-i-outline-path-3"></path><path fill="none" d="M0 0h36v36H0z"></path></svg>)
}
function ClarityExclamationCircleSolid(props: SVGProps<SVGSVGElement>) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36" {...props}><path fill="currentColor" d="M18 6a12 12 0 1 0 12 12A12 12 0 0 0 18 6m-1.49 6a1.49 1.49 0 0 1 3 0v6.89a1.49 1.49 0 1 1-3 0ZM18 25.5a1.72 1.72 0 1 1 1.72-1.72A1.72 1.72 0 0 1 18 25.5" className="clr-i-solid clr-i-solid-path-1"></path><path fill="none" d="M0 0h36v36H0z"></path></svg>)
}
function ClarityExclamationTriangleSolid(props: SVGProps<SVGSVGElement>) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36" {...props}><path fill="currentColor" d="M30.33 25.54L20.59 7.6a3 3 0 0 0-5.27 0L5.57 25.54A3 3 0 0 0 8.21 30h19.48a3 3 0 0 0 2.64-4.43Zm-13.87-12.8a1.49 1.49 0 0 1 3 0v6.89a1.49 1.49 0 1 1-3 0ZM18 26.25a1.72 1.72 0 1 1 1.72-1.72A1.72 1.72 0 0 1 18 26.25" className="clr-i-solid clr-i-solid-path-1"></path><path fill="none" d="M0 0h36v36H0z"></path></svg>)
}

export function PreviewPanelContent(
  { PreviewInfoContent, PreviewSection, className, ...props }: {
    PreviewSection: ReactNode,
    PreviewInfoContent: ReactNode,
  } & ComponentProps<"div">
) {
  return (
    <>
      <div className={cn("mb-8 w-full flex flex-col items-center fadeIn-0 gap-2 **:transition", className)} {...props}>
        {PreviewSection}
      </div>
      <PreviewInfo>
        {PreviewInfoContent}
      </PreviewInfo>
    </>
  )
}

// export function PreviewFrame(
//   { className, ...props }: ComponentProps<"div"> & {}
// ) {
//   return (<div {...props} className={cn(
//     "bg-[var(--bg)]",
//     "text-[var(--fg)]",
//     "font-[family-name:var(--font)]",
//     "w-full flex flex-col rounded-md", className
//   )} />)
// }

export function PreviewMenu(
  { className, ...props }: ComponentProps<"div"> & {}
) {
  return (<div {...props} className={cn(
    "flex gap-2 self-end z-10",
    className
  )} />)
}
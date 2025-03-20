"use client"

import { useEffect, useState, type ComponentProps } from "react"
import { GoToUrlButton } from "./InputForm"
import { cn } from "lazy-cn"

export function RecentSuggestions(props: {
  hidden: boolean,
}) {
  const { hidden } = props
  // const [hidden, setIhidden] = useState(false)
  // const hidden = false
  const [recent, setRecent] = useState<string[] | null>(null)

  useEffect(() => {
    if (!props.hidden)
      try {
        const recentSuggestions = JSON.parse(localStorage.getItem('recents') ?? "[]")
        setRecent(recentSuggestions)
      } catch (error) {
        localStorage.setItem('recents', JSON.stringify([]))
      }
  }, [props.hidden])

  const onClear = () => {
    const recentContainer = document.getElementById('recentGrid') as HTMLDivElement
    const rect = recentContainer.getBoundingClientRect()
    const anim = recentContainer.animate([
      { height: `${ rect.height }px` },
      { height: '0px' },
    ], {
      fill: 'forwards',
      duration: 400,
      easing: 'ease-in-out',
    })
    anim.onfinish = () => {
      localStorage.setItem('recents', JSON.stringify([]))
      setRecent([])
      setTimeout(() => {
        anim.cancel()
      }, 10)
    }
  }

  const suggestionList = (recent ?? []).length < 5 ? suggestions : []

  return (
    <div className={cn("transition-opacity opacity-0 delay-100", recent !== null ? "opacity-100" : "")}>
      {/* <button onClick={() => setIhidden(!hidden)}>Toggle Hidden</button> */}
      <div className="grid grid-rows-[1fr] closed:grid-rows-[0fr] group overflow-hidden transition-[grid-template-rows] duration-500" data-closed={hidden ? "" : undefined}>
        <div className={cn("min-h-0 min-w-0 transition-all duration-500 delay-200", hidden && "opacity-0 -translate-y-10")}>

          <div id="recentGrid" className="min-h-0 min-w-0 overflow-hidden">
            {
              !!recent?.length && (<>
                <div className={cn("mt-10 text-base text-foreground-muted pb-2 transition-all")}>
                  <div className="text-foreground-muted-3">
                    recent <button className="hover:underline text-[size:inherit] font-normal" onClick={onClear}>(clear)</button>
                  </div>
                </div>
                {recent?.map((url, i) => (
                  <SuggestionGoToUrlButton key={i} value={url}
                    innerProps={{
                      className: cn(
                        "fadeInFromLeft-0 transition-[opacity,_translate] flex",
                        (hidden) && "opacity-0 -translate-x-10"
                      ),
                      style: {
                        animationDelay: `${ i * 100 + 500 }ms`,
                        transitionDelay: `${ hidden
                          ? ((recent.length - i + suggestionList.length) * 30)
                          : ((i) * 100 + 500) }ms`
                      }
                    }}
                  />
                ))}
              </>)
            }
          </div>

          {
            !!suggestionList.length && <>
              <div className={cn("mt-10 text-base text-foreground-muted pb-2 transition-[asdf]")}>
                <div className="text-foreground-muted-3">suggested</div>
              </div>



              {suggestionList.map((url, i) => (
                <SuggestionGoToUrlButton key={i} value={url}
                  innerProps={{
                    className: cn(
                      "fadeInFromLeft-0 transition-[opacity,_translate]",
                      hidden && "opacity-0 -translate-x-10"
                    ),
                    style: {
                      animationDelay: `${ (i + (recent?.length ?? 0)) * 100 + 300 }ms`,
                      transitionDelay: `${ hidden
                        ? ((suggestionList.length + (recent?.length ?? 0) - i) * 30)
                        : ((i + (recent?.length ?? 0)) * 100 + 500) }ms`
                    }
                  }}
                />

              ))}
            </>
          }
        </div>
      </div>
    </div>
  )


}


const suggestions = [
  'localhost:3000',
  'localhost:8080',
  'notion.so',
  'vercel.com',
  'linear.app',
]


function SuggestionGoToUrlButton(props: {
  value: string,
  innerProps: ComponentProps<"button">
}) {
  return (
    <GoToUrlButton  {...props.innerProps} value={props.value}>
      <div className="text-nowrap overflow-ellipsis overflow-hidden">{props.value}</div>
      <div className="font-mono shrink-0 pl-1 text-[0.5rem] self-center">{'->'}</div>
    </GoToUrlButton>
  )
}
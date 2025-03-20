import ErrorCard from "./module/error/ErrorCard";
import { tab } from "./module/tab/tab-primitives";
import { Tabs } from "./module/tab/Tabs";
import { type MetadataMetadataItem, type ResoledMetadata } from "./lib/get-metadata-field-data";
import { ExternalIcon, MetadataRow, Separator } from "./_view/MetadataRow";
import { Suspense, type ComponentProps } from "react";
import { FaviconPreview, IconListPreviewMetadataItem } from "./_view/Favicon";
import { appFetch } from "./lib/fetch";
import { px } from "./lib/unit";
import { OpengraphMetadata } from "./_view/OpenGraph";
import { cn } from "lazy-cn";
import { getImageSizeFromResponse } from "./lib/image-size";

function MetaCard({ className, ...props }: ComponentProps<"section">) {
  return (
    <section className={cn("card fadeIn-0", className)}>
      <div key={Math.random()} className="card-content meta-info-grid fadeBlurIn-100">
        {props.children}
      </div>
    </section>
  )
}

export async function MetaInfoPanel(
  props: { metadata: Promise<ResoledMetadata | null>, head: Promise<string | null> }
) {
  try {
    const metadata = await props.metadata;
    if (!metadata) return null

    const head = await props.head;

    return (
      <Tabs
        tabProps={{ className: "fadeInFromLeft-0" }}
        id="info"
        tabs={[
          tab("General", <>General</>, <MetaCard><SummaryMetadata m={metadata} /></MetaCard>),
          tab("Open Graph", <>Open Graph</>, <MetaCard><OpengraphMetadata m={metadata} /></MetaCard>),
          tab("Twitter", <>Twitter</>, <MetaCard><TwitterMetadata m={metadata} /></MetaCard>),
          tab("Icons", <>Icons</>, <MetaCard><IconMetadata data={metadata} /></MetaCard>),
          // tab("JSON-LD", <>JSON-LD</>, <MetaCard></MetaCard>),
          tab("Raw", <>Raw</>, <MetaCard><pre className="overflow-auto text-xs">{head?.split('<body')[0].replaceAll('/><', '/>\n<').replaceAll(/<style[^>]*>[\s\S]*?<\/style>/g, '<style>...</style>')}</pre></MetaCard >),
        ]} />
    );
  } catch (error) {
    console.log(error)
    return <ErrorCard error={error} />;
  }
}

function SummaryMetadata(props: { m: ResoledMetadata }) {
  const d = props.m;
  return (
    <>
      <MetadataRow data={d.general.title} />
      <MetadataRow data={d.general.description} />
      <MetadataRow data={d.general.author} />
      <MetadataRow data={d.general.favicons}>
        <Suspense fallback="Loading...">
          <FaviconSummary data={d.general.favicons} baseUrl={d.general.rawUrl.value} />
        </Suspense>
      </MetadataRow>
      <Separator />
      <MetadataRow data={d.og.title} />
      <MetadataRow data={d.og.description} />
      <MetadataRow data={d.og.image} />
      <MetadataRow data={d.og.url} />
      <MetadataRow data={d.og.type} />
      <MetadataRow data={d.og.siteName} />
      <Separator />
      <MetadataRow data={d.twitter.title} />
      <MetadataRow data={d.twitter.description} />
      <MetadataRow data={d.twitter.card} />
      <MetadataRow data={d.twitter.image} />
      <Separator />
      <MetadataRow data={d.general.viewport} />
      <MetadataRow data={d.general.url} />
      <MetadataRow data={d.general.robots} />
      <MetadataRow data={d.general.applicationName} />
      <MetadataRow data={d.general.keywords} />
      <MetadataRow data={d.general.generator} />
      <MetadataRow data={d.general.license} />
      <Separator />
      <MetadataRow data={d.general.colorScheme} />
      <MetadataRow data={d.general.colorTheme}>
        <ColorThemes data={d.general.colorTheme} />
      </MetadataRow>
      <MetadataRow data={d.general.formatDetection} />
    </>
  )
}

async function FaviconSummary(props: { data: ResoledMetadata['general']['favicons'], baseUrl: string }) {
  const favicons = props.data.values
  if (!favicons) return <span className="meta-mute">-</span>

  let favicon: {
    source: string,
    size: string,
    resolvedSize: number | null,
    type: string,
    value: string,
    resolvedUrl: string,
  } | null = null

  for (const f of favicons) {
    const validUrl = await isValidIcon(f.resolvedUrl)
    if (validUrl) {
      const resolvedSize = f.sizes ? parseInt(f.sizes) : NaN
      favicon = {
        source: f.source ?? "?",
        size: f.sizes ?? "size undefined",
        value: f.value ?? "value undefined (huh?)",
        type: f.type ?? "type undefined",
        resolvedSize: isNaN(resolvedSize) ? null : resolvedSize,
        resolvedUrl: validUrl
      }
      break
    }


    // if (!f.resolvedUrl) continue
    // const res = await appFetch(f.resolvedUrl)
    // const imageSizeRes = await getImageSizeFromResponse(res)
    // if (!imageSizeRes.imageSize) continue
    // favicon = {
    //   value: f.value ?? "",
    //   resolvedUrl: f.resolvedUrl,
    //   label: f.label
    // }
    // break
  }

  if (!favicon) return <span className="meta-mute">-</span>

  return (
    <div className="flex *:first:shrink-0 gap-2 items-start">
      <FaviconPreview
        src={favicon.resolvedUrl}
      />
      <div>
        <div className="text-xs">
          {favicon.source}
        </div>
        <a className="link-underline block leading-snug" target="_blank" href={favicon.resolvedUrl}>
          {favicon.value} <ExternalIcon />
        </a>
        <div className="text-xs">
          <div>{favicon.type}</div>
          <span>{favicon.size}</span>
        </div>
      </div>
    </div>
  )
}

function ColorThemes(
  props: { data: MetadataMetadataItem }
) {
  return (
    <>
      {props.data.values?.length === 0 ? <span className="meta-mute">-</span> : null}
      {props.data.values?.map((item, i) => {
        return (
          <div key={i} className="flex gap-1 items-start my-1">
            <div
              className="w-4 h-4 rounded-sm border border-border shrink-0"
              style={{
                background: item.value
              }}
            />
            <span className="text-xs">{item.value}</span>
            <span className="text-xs">{item.label}</span>
          </div>
        )
      })}
    </>
  )
}



function TwitterMetadata(
  props: { m: ResoledMetadata }
) {
  const d = props.m
  return (
    <>
      <MetadataRow data={d.twitter.title} />
      <MetadataRow data={d.twitter.description} />
      <MetadataRow data={d.twitter.card} />
      <MetadataRow data={d.twitter.image} />
      <MetadataRow data={d.twitter.imageAlt} />
      <Separator />
      <MetadataRow data={d.twitter.site} />
      <MetadataRow data={d.twitter.siteId} />
      <Separator />
      <MetadataRow data={d.twitter.creator} />
      <MetadataRow data={d.twitter.creatorId} />
      <Separator />
      <MetadataRow data={d.twitter.player} />
      <MetadataRow data={d.twitter.playerWidth} />
      <MetadataRow data={d.twitter.playerHeight} />
      <MetadataRow data={d.twitter.playerStream} />
      <Separator />
      <MetadataRow data={d.twitter.appCountry} />
      <Separator />
      <MetadataRow data={d.twitter.appNameIphone} />
      <MetadataRow data={d.twitter.appIdIphone} />
      <MetadataRow data={d.twitter.appUrlIphone} />
      <Separator />
      <MetadataRow data={d.twitter.appNameIpad} />
      <MetadataRow data={d.twitter.appIdIpad} />
      <MetadataRow data={d.twitter.appUrlIpad} />
      <Separator />
      <MetadataRow data={d.twitter.appNameGoogleplay} />
      <MetadataRow data={d.twitter.appIdGoogleplay} />
      <MetadataRow data={d.twitter.appUrlGoogleplay} />
    </>
  )
}

function IconMetadata(props: {
  data: ResoledMetadata
}) {

  return (
    <>
      <MetadataRow data={{ label: "icon", value: undefined }}
        putInfoBesideLabel
        contentProps={{ className: "col-span-2 col-span-2 row-start-[10] mt-2 grid grid-cols-1 gap-2" }}>
        {(async () => {
          if (!props.data.general.favicons.values.length) return <div className="opacity-40">-</div>

          const rawFavicons = props.data.general.favicons.values

          const favicons: {
            source: string,
            size: string,
            resolvedSize: number | null,
            value: string,
            type: string,
            resolvedUrl: string,
          }[] = []

          for (const f of rawFavicons) {
            const validUrl = await isValidIcon(f.resolvedUrl)
            if (validUrl) {
              const resolvedSize = f ? parseInt(f.sizes ?? "") : NaN
              favicons.push({
                source: f.source ?? "?",
                size: f.sizes ?? "size undefined",
                value: f.value ?? "value undefined (huh?)",
                type: f.type ?? "type undefined",
                resolvedSize: isNaN(resolvedSize) ? null : resolvedSize,
                resolvedUrl: validUrl
              })
              continue
            }
          }

          return <>{favicons.map((item, i) => {
            const { source, size, value, resolvedUrl, resolvedSize, type } = item
            return <div key={i} className="flex gap-2 items-start flex-wrap">
              <FaviconPreview
                imgProps1={{ style: { height: resolvedSize ? px(resolvedSize) : undefined, width: resolvedSize ? px(resolvedSize) : undefined } }}
                imgProps2={{ style: { height: resolvedSize ? px(resolvedSize) : undefined, width: resolvedSize ? px(resolvedSize) : undefined } }}
                src={resolvedUrl} />
              <div className="text-xs meta-info-field-value break-words min-w-40 basis-0 grow">
                {source}<br />

                <a className={cn("link-underline block leading-snug", value.startsWith('data:') && "line-clamp-3")} target="_blank" href={resolvedUrl}>
                  {value} <ExternalIcon />
                </a>

                {size ?? "size undefined"}<br />
                {type ?? "size undefined"}<br />
              </div>
            </div>
          })}
          </>
        })()}
      </MetadataRow>
      <hr />
      <IconListPreviewMetadataItem data={props.data.icons.appleTouchIcons} />
      <hr />
      <IconListPreviewMetadataItem data={props.data.icons.appleTouchIconsPrecomposed} />
    </>
  )
}

async function isValidIcon(url?: string) {
  if (!url) return false
  const res = await appFetch(url)
  if (res.headers.get('content-type') === 'image/svg+xml') return url
  if (res.headers.get('content-type')?.startsWith('text/')) return false

  const imageSizeRes = await getImageSizeFromResponse(res)
  if (!imageSizeRes.imageSize) return false
  return url
}
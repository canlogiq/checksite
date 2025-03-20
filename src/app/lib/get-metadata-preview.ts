import type { Metadata } from "./get-metadata";

export function getTwitterMetadataPreview(m: Metadata) {

  return {
    card: {
      value: m.twitter.card ?? (m.og.title && m.og.type && m.og.description) ? "summary" : null,
      description: `The card type\nUsed with all cards`
    },
    site: {
      value: m.twitter.site ?? null,
      description: `@username of website. Either twitter:site or twitter:site:id is required.\nUsed with summary, summary_large_image, app, player cards`
    },
    siteId: {
      value: m.twitter.siteId ?? null,
      description: `Same as twitter:site, but the user’s Twitter ID. Either twitter:site or twitter:site:id is required.\nUsed with summary, summary_large_image, player cards`
    },
    creator: {
      value: m.twitter.creator ?? null,
      description: `@username of content creator\nUsed with summary_large_image cards`
    },
    creatorId: {
      value: m.twitter.creatorId ?? null,
      description: `Twitter user ID of content creator\nUsed with summary, summary_large_image cards`
    },
    description: {
      value: m.twitter.description ?? m.og.description ?? null,
      description: `Description of content (maximum 200 characters)\nUsed with summary, summary_large_image, player cards`
    },
    title: {
      value: m.twitter.title ?? m.og.title ?? null,
      description: `Title of content (max 70 characters)\nUsed with summary, summary_large_image, player cards`
    },
    image: {
      value: m.twitter.image ?? m.og.image ?? null,
      description: `URL of image to use in the card. Images must be less than 5MB in size. JPG, PNG, WEBP and GIF formats are supported. Only the first frame of an animated GIF will be used. SVG is not supported.\nUsed with summary, summary_large_image, player cards`
    },
    imageAlt: {
      value: m.twitter.imageAlt ?? m.og.imageAlt,
      description: `A text description of the image conveying the essential nature of an image to users who are visually impaired. Maximum 420 characters.\nUsed with summary, summary_large_image, player cardss`
    },
    player: {
      value: m.twitter.player ?? null,
      description: `HTTPS URL of player iframe\nUsed with player card`,
    },
    playerWidth: {
      value: m.twitter.playerWidth ?? null,
      description: `Width of iframe in pixels\nUsed with player card`,
    },
    playerHeight: {
      value: m.twitter.playerHeight ?? null,
      description: `Height of iframe in pixels\nUsed with player card`,
    },
    playerStream: {
      value: m.twitter.playerStream ?? null,
      description: `URL to raw video or audio stream\nUsed with player card`,
    },
    appNameIphone: {
      value: m.twitter.appNameIphone ?? null,
      description: `Name of your iPhone app\nUsed with app card`,
    },
    appIdIphone: {
      value: m.twitter.appIdIphone ?? null,
      description: `Your app ID in the iTunes App Store (Note: NOT your bundle ID)\nUsed with app card`,
    },
    appUrlIphone: {
      value: m.twitter.appUrlIphone ?? null,
      description: `Your app’s custom URL scheme (you must include "://" after your scheme name)\nUsed with app card`,
    },
    appNameIpad: {
      value: m.twitter.appNameIpad ?? null,
      description: `Name of your iPad optimized app\nUsed with app card`,
    },
    appIdIpad: {
      value: m.twitter.appIdIpad ?? null,
      description: `Your app ID in the iTunes App Store\nUsed with app card`,
    },
    appUrlIpad: {
      value: m.twitter.appUrlIpad ?? null,
      description: `Your app’s custom URL scheme\nUsed with app card`,
    },
    appNameGoogleplay: {
      value: m.twitter.appNameGoogleplay ?? null,
      description: `Name of your Android app\nUsed with app card`,
    },
    appIdGoogleplay: {
      value: m.twitter.appIdGoogleplay ?? null,
      description: `Your app ID in the Google Play Store\nUsed with app card`,
    },
    appUrlGoogleplay: {
      value: m.twitter.appUrlGoogleplay ?? null,
      description: `Your app’s custom URL scheme\nUsed with app card`,
    },
    appCountry: {
      value: m.twitter.appCountry ?? null,
      description: `If your application is not available in the US App Store, you must set this value to the two-letter country code for the App Store that contains your application.`
    }
  }
}

export function getTwitterSummaryLargePreview(m: Metadata) {

  if (m.twitter.card !== "summary_large_image")
    return "twitter:card must be summary_large_image"

  if (!m.twitter.title && !m.og.title)
    return "twitter:title is required"

  return {
    card: m.twitter.card,
    site: m.twitter.site,
    title: m.twitter.title ?? m.og.title,
    description: m.twitter.description ?? m.og.description,
    image: m.twitter.image ?? m.og.image,
    imageAlt: m.twitter.imageAlt,
  }
}
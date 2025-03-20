import { appFetch } from "@/app/lib/fetch";
import type { NextRequest } from "next/server";

// proxy image from search params
export async function GET(request: NextRequest) {
  const imageUrl = request.nextUrl.searchParams.get("url");
  if (!imageUrl) return new Response("Missing URL", { status: 400 });

  try {
    const response = await appFetch(imageUrl);

    return new Response(response.body, {
      headers: {
        ...(() => {
          const contentType = response.headers.get('content-type')
          if (contentType) {
            return {
              "content-type": contentType,
            }
          }
        })(),
      }
    })

  } catch (error) {
    console.log("Proxy Img: Error:\n", error)
    return Response.json({ error: error instanceof Error ? error.message : "Unknown error occurred" }, { status: 500 });
  }
}

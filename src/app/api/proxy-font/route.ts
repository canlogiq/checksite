import { appFetch } from "@/app/lib/fetch";
import type { NextRequest } from "next/server";

// proxy font from search params
export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url) return new Response("Missing URL", { status: 400 });

  try {
    const response = await appFetch(url);
    return new Response(response.body, {
      headers: { ...response.headers, },
    })
  } catch (error) {
    console.log("Proxy Img: Error:\n", error)
    return Response.json({ error: error instanceof Error ? error.message : "Unknown error occurred" }, { status: 500 });
  }
}
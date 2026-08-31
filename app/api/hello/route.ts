import type { NextRequest } from "next/server";

// リクエストの内容を読むRoute Handler
// 静的エクスポートでは使えないが、SSR（OpenNext）では動作する
export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get("name") ?? "world";

  return Response.json({
    message: `Hello, ${name}!`,
    userAgent: request.headers.get("user-agent"),
    renderedAt: new Date().toISOString(),
  });
}

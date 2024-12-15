import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 認可サーバのエンドポイント

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("Authorization")?.value;

  //if (!token) {
  //  return NextResponse.redirect(new URL("/login", request.url));
  //}

  //const authResponse = await fetch("/api/auth", {
  //  method: "POST",
  //  headers: {
  //    "Content-Type": "application/json",
  //  },
  //  body: JSON.stringify({ token }),
  //});
  //
  //if (!authResponse.ok) {
  //  return NextResponse.redirect(new URL("/login", request.url));
  //}
  //
  //const { role } = await authResponse.json();
  //
  const url = request.nextUrl.clone();
  const role = "media"
  if (role === "company") {
    if (url.pathname.startsWith("/company")) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/forbidden", request.url));
  }

  if (role === "media") {
    // 一般ユーザーがアクセス可能なページ
    if (url.pathname.startsWith("/media")) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/forbidden", request.url));
  }

  return NextResponse.redirect(new URL("/login", request.url));
}

// 対象となるパスを指定
export const config = {
  matcher: ["/company/:path*", "/media/:path*"],
};

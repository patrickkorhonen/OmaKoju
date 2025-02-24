import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const session = request.cookies.get("refreshToken")?.value;
    const currentPath = request.nextUrl.pathname;

    if (session && currentPath == "/login" || currentPath == "/register") {
        console.log("Session exists, redirecting to /");
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (!session && currentPath == "/dashboard") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}


export { default } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isAdminPath = request.nextUrl.pathname.startsWith("/admin");

  // ดึง Role จาก Cookie
  const userRole = request.cookies.get("session-role")?.value;

  if (isAdminPath) {
    if (!userRole) {
      // ไม่มี Session เลย: Redirect ไปหน้า Login
      return NextResponse.redirect(new URL("/signin/user", request.url));
    }

    if (userRole !== "admin") {
      // มี Session แต่ Role ไม่ใช่ Admin: Redirect ไปหน้า 403 (Forbidden)
      return NextResponse.redirect(new URL("/403", request.url));
    }
  }

  // ถ้าไม่ใช่เส้นทาง Admin หรือ Role เป็น Admin ถูกต้อง: ดำเนินการต่อไป
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/main/:path*"], // ป้องกันเฉพาะเส้นทาง /admin และ /main เท่านั้น
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // ตรวจสอบเส้นทาง Admin (รวม dashboard และ sub-paths)
  const isAdminPath = pathname.startsWith("/admin") || pathname.startsWith("/dashboard");
  const isAdminApi = pathname.startsWith("/api/admin");

  // ดึง Role และ Session ID จาก Cookie
  const userRole = request.cookies.get("session-role")?.value;
  const adminSessionId = request.cookies.get("sessionAdmin-id")?.value;

  // ป้องกัน Admin Routes
  if (isAdminPath || isAdminApi) {
    // ตรวจสอบว่ามี session admin หรือไม่
    if (!adminSessionId || !userRole) {
      // ไม่มี Session: Redirect ไปหน้า Login Admin
      if (isAdminApi) {
        return NextResponse.json(
          { message: "Unauthorized - Admin access required" },
          { status: 401 }
        );
      }
      return NextResponse.redirect(new URL("/signin/admin", request.url));
    }

    // ตรวจสอบ Role ต้องเป็น admin เท่านั้น
    if (userRole !== "admin") {
      if (isAdminApi) {
        return NextResponse.json(
          { message: "Forbidden - Admin privileges required" },
          { status: 403 }
        );
      }
      // มี Session แต่ Role ไม่ใช่ Admin: Redirect ไปหน้า 403
      return NextResponse.redirect(new URL("/signin/admin", request.url));
    }
  }

  // เพิ่ม Security Headers
  const response = NextResponse.next();
  
  // Security Headers
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  
  // สำหรับ Admin routes เพิ่ม headers เพิ่มเติม
  if (isAdminPath || isAdminApi) {
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
  }

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
    "/api/admin/:path*",
    "/main/:path*"
    // Note: User routes are protected by NextAuth middleware (if configured)
    // NextAuth handles /api/auth/* routes automatically
  ],
};

import { NextRequest, NextResponse } from "next/server";

/**
 * ⚠️ DEPRECATED: Route นี้ไม่ได้ใช้แล้ว
 * User ใช้ NextAuth สำหรับการเข้าสู่ระบบแทน
 * Route นี้ถูกปิดการใช้งานเพื่อความปลอดภัย
 * 
 * สำหรับ User: ใช้ NextAuth signIn() จาก next-auth/react
 * สำหรับ Admin: ใช้ /api/admin route
 */
export async function POST(request: NextRequest) {
  return NextResponse.json(
    { 
      message: "This route is deprecated. Please use NextAuth signin instead.",
      error: "Use /api/auth/signin or signIn() from next-auth/react",
      info: "User authentication is handled by NextAuth. Admin authentication uses /api/admin"
    },
    { status: 410 } // 410 Gone
  );
}

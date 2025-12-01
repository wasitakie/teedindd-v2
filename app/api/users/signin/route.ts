import connect from "@/libs/config";
import { cookies } from "next/headers";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    // console.log("Email:", email);
    // console.log("password:", password);
    const [response]: any = await connect.execute(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]
    );
    const data = response[0];

    // 4. *** จุดสำคัญ: ตรวจสอบ Role ***
    if (data.role !== "user" && data.role !== "editor") {
      // หากผู้ใช้มี role เป็น 'admin' แต่พยายาม Login ผ่าน User API ให้ปฏิเสธ
      return NextResponse.json(
        { message: "Invalid role for this sign-in route." },
        { status: 403 }
      );
    }

    // กำหนด Options ที่ใช้ร่วมกันสำหรับ Cookie ทั้งหมด
    const cookieOptions = {
      httpOnly: true, // ป้องกันการเข้าถึงจาก JavaScript ฝั่ง Client
      secure: process.env.NODE_ENV === "production", // ใช้ HTTPS เท่านั้นใน Production
      maxAge: 60 * 60 * 24 * 7, // 1 สัปดาห์
      path: "/",
      sameSite: "strict" as const, // ต้องระบุเป็น 'strict'
    };

    const sessionId = data.id;
    const sessionRole = data.role;
    const cookiesStore = await cookies();
    cookiesStore.set("session-id", sessionId, cookieOptions);
    cookiesStore.set("session-role", sessionRole, cookieOptions);
    return NextResponse.json({
      message: "Signin API called successfully",
      data,
    });
  } catch (err) {
    console.error("Error in signin API:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

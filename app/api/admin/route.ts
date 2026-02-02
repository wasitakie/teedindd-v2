import pool from "@/libs/config";
import { compare, hashSync } from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

// const has = hashSync("admin1234", 10);
// console.log("Hashed password for admin1234:", has);

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validate input
  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 },
    );
  }

  // Validate email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json(
      { message: "Invalid email format" },
      { status: 400 },
    );
  }

  try {
    const [response]: any = await pool.execute(
      "SELECT * FROM admin WHERE email = ?",
      [email],
    );

    // ไม่บอกว่า email มีอยู่หรือไม่ (ป้องกัน user enumeration)
    if (!response || response.length === 0) {
      // ใช้เวลาเท่ากันเพื่อป้องกัน timing attack
      await compare("dummy", "$2b$10$dummyhashfordummycomparison");
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    const data = response[0];

    // ตรวจสอบ password
    const passwordMatch = await compare(password, data.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    // ตรวจสอบ Role - ต้องเป็น admin เท่านั้น
    if (data.role !== "admin") {
      return NextResponse.json(
        { message: "Access denied. Requires Admin privileges." },
        { status: 403 },
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

    const sessionAdmin = data.id;
    const sessionRole = data.role;

    const cookiesStore = await cookies();
    cookiesStore.set("sessionAdmin-id", sessionAdmin, cookieOptions);
    cookiesStore.set("session-role", sessionRole, cookieOptions);

    return NextResponse.json({
      message: "Signin API called successfully",
      success: true,
    });
  } catch (err) {
    // Log error แต่ไม่ส่ง error details ไปยัง client
    console.error("Error in admin signin API:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

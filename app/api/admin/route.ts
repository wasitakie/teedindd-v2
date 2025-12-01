import connect from "@/libs/config";
import { compare, hashSync } from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

// const has = hashSync("admin1234", 10);
// console.log("Hashed password for admin1234:", has);

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const [response]: any = await connect.execute(
      "SELECT * FROM admin WHERE email = ?",
      [email]
    );
    const data = response[0];

    const passwordMatch = await compare(password as string, data.password);

    if (!passwordMatch) {
      redirect("/signin/admin");
    }

    // 4. *** จุดสำคัญ: ตรวจสอบ Role ***
    if (data.role !== "admin") {
      // หากผู้ใช้ไม่มี role เป็น 'admin' ให้ปฏิเสธทันที
      return NextResponse.json(
        { message: "Access denied. Requires Admin privileges." },
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

    const sessionAdmin = data.id;
    const sessionRole = data.role;

    const cookiesStore = await cookies();
    cookiesStore.set("sessionAdmin-id", sessionAdmin, cookieOptions);
    cookiesStore.set("session-role", sessionRole, cookieOptions);

    console.log("password:", passwordMatch);

    return NextResponse.json({ message: "Signin API called successfully" });
  } catch (err) {
    console.error("Error in signin API:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

import pool from "@/libs/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate and sanitize input
    const path =
      typeof body.path === "string"
        ? body.path.substring(0, 500) // จำกัดความยาว
        : "/";
    const referer =
      typeof body.referer === "string" ? body.referer.substring(0, 500) : "";
    const userAgent =
      typeof body.userAgent === "string"
        ? body.userAgent.substring(0, 1000) // จำกัดความยาว
        : "";

    // Get client IP from headers if not provided
    const clientIp =
      (typeof body.ip === "string" ? body.ip : null) ||
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip")?.trim() ||
      "unknown";

    // Validate IP format (basic validation)
    const ipPattern = /^[0-9a-fA-F.:]+$/;
    const sanitizedIp = ipPattern.test(clientIp)
      ? clientIp.substring(0, 45)
      : "unknown";

    // Insert visitor record using parameterized query (ป้องกัน SQL injection)
    await pool.execute(
      `INSERT INTO visitors (path, referer, user_agent, ip_address, visited_at) 
       VALUES (?, ?, ?, ?, NOW())`,
      [path, referer, userAgent, sanitizedIp],
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    // Log error แต่ไม่ส่ง error details ไปยัง client
    console.error("Error tracking visitor:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

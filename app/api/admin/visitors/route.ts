import pool from "@/libs/config";
import { getSessionAdminData } from "@/libs/auth.s";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Check admin authentication - ตรวจสอบอย่างเข้มงวด
    const admin = await getSessionAdminData();

    if (!admin) {
      return NextResponse.json(
        { message: "Unauthorized - Admin session required" },
        { status: 401 },
      );
    }

    if (admin.role !== "admin") {
      return NextResponse.json(
        { message: "Forbidden - Admin privileges required" },
        { status: 403 },
      );
    }

    // Get query parameters for filtering - ตรวจสอบและ sanitize input
    const { searchParams } = new URL(request.url);
    const periodParam = searchParams.get("period");

    // Whitelist validation - อนุญาตเฉพาะค่าที่กำหนดเท่านั้น
    const allowedPeriods = ["today", "week", "month", "all"];
    const period = allowedPeriods.includes(periodParam || "")
      ? periodParam || "today"
      : "today";

    // ใช้ prepared statements เพื่อป้องกัน SQL injection
    let dateFilter = "";
    switch (period) {
      case "today":
        dateFilter = "DATE(visited_at) = CURDATE()";
        break;
      case "week":
        dateFilter = "visited_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)";
        break;
      case "month":
        dateFilter = "visited_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)";
        break;
      case "all":
      default:
        dateFilter = "1=1";
        break;
    }

    // Get total visitors
    const [totalResult]: any = await pool.execute(
      `SELECT COUNT(*) as total FROM visitors WHERE ${dateFilter}`,
    );
    const totalVisitors = totalResult[0]?.total || 0;

    // Get unique visitors (by IP)
    const [uniqueResult]: any = await pool.execute(
      `SELECT COUNT(DISTINCT ip_address) as unique_visitors 
       FROM visitors WHERE ${dateFilter}`,
    );
    const uniqueVisitors = uniqueResult[0]?.unique_visitors || 0;

    // Get visitors by day (last 7 days)
    const [dailyResult]: any = await pool.execute(
      `SELECT 
        DATE(visited_at) as date,
        COUNT(*) as count,
        COUNT(DISTINCT ip_address) as unique_count
       FROM visitors 
       WHERE visited_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
       GROUP BY DATE(visited_at)
       ORDER BY date DESC`,
    );

    // Get top visited pages
    const [topPagesResult]: any = await pool.execute(
      `SELECT 
        path,
        COUNT(*) as visits,
        COUNT(DISTINCT ip_address) as unique_visits
       FROM visitors 
       WHERE ${dateFilter}
       GROUP BY path
       ORDER BY visits DESC
       LIMIT 10`,
    );

    // Get visitors by hour (today)
    const [hourlyResult]: any = await pool.execute(
      `SELECT 
        HOUR(visited_at) as hour,
        COUNT(*) as count
       FROM visitors 
       WHERE DATE(visited_at) = CURDATE()
       GROUP BY HOUR(visited_at)
       ORDER BY hour ASC`,
    );

    return NextResponse.json({
      totalVisitors,
      uniqueVisitors,
      dailyStats: dailyResult,
      topPages: topPagesResult,
      hourlyStats: hourlyResult,
      period,
    });
  } catch (error: any) {
    // Log error แต่ไม่ส่ง error details ไปยัง client เพื่อความปลอดภัย
    console.error("Error fetching visitor stats:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

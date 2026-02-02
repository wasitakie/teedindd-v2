import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import pool from "@/libs/config";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json(
      { error: "กรุณาเข้าสู่ระบบก่อน" },
      { status: 401 },
    );
  }

  const [res] = await pool.execute(
    "SELECT * FROM post WHERE users_id = ? ORDER BY id DESC",
    [session.user.id],
  );
  return NextResponse.json(res);
}

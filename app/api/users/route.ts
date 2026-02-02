import pool from "@/libs/config";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const [res] = await pool.execute("SELECT * FROM users");
  return NextResponse.json(res);
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const hashPassword = await bcrypt.hash(password, 10);
  const [res] = await pool.execute(
    "INSERT INTO users (name,email,password) VALUES (?,?,?)",
    [name, email, hashPassword],
  );
  return NextResponse.json(res);
}

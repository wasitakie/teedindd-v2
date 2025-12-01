import connect from "@/libs/config";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const [res] = await connect.execute("SELECT * FROM users");
  return NextResponse.json(res);
}

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const hashPassword = await bcrypt.hash(password, 10);
  const [res] = await connect.execute(
    "INSERT INTO users (email,password) VALUES (?,?)",
    [email, hashPassword]
  );
  return NextResponse.json(res);
}

import pool from "@/libs/config";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";

export async function POST(req: NextRequest) {
  const formdata = await req.formData();
  const session = await getServerSession(authOptions);
  const title = formdata.get("title") as string;
  const files = formdata.getAll("image") as File[];
  if (!session || !session.user?.id) {
    return NextResponse.json(
      { error: "กรุณาเข้าสู่ระบบก่อน" },
      { status: 401 },
    );
  }
  if (files.length > 5) {
    return NextResponse.json(
      { message: "คุณสามารถอัปโหลดได้สูงสุด 5 ไฟล์" },
      { status: 400 },
    );
  }
  const uploadedPaths: string[] = [];

  // วนลูปบันทึกไฟล์
  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}_${file.name.replace(/\s/g, "_")}`;
    const uploadPath = `public/users/images/${fileName}`;

    await writeFile(uploadPath, buffer);
    uploadedPaths.push(`/images/${fileName}`);
  }

  const randomInt = Math.floor(100000 + Math.random() * 900000);
  function generateSlug(text: string) {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") // แทนที่ช่องว่างด้วย -
      .replace(/[^\u0E00-\u0E7Fa-z0-9-]/g, "") // ลบอักขระพิเศษ (รักษาภาษาไทยไว้)
      .replace(/-+/g, "-"); // ลดทอนขีดที่ซ้ำซ้อน
  }
  const slug = `${generateSlug(title)}-${Date.now().toString().slice(-4)}`;
  const [res] = await pool.execute(
    "INSERT INTO post(slug,post_number, category, category_sell, category_rent, title, description, price, province, district, sub_district, images, area_size, users_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      slug,
      randomInt,
      formdata.get("category_type"),
      formdata.get("category_sell"),
      formdata.get("category_rent"),
      title,
      formdata.get("description"),
      Number(formdata.get("price")),
      formdata.get("province"),
      formdata.get("district"),
      formdata.get("sub_district"),
      uploadedPaths.join(","),
      formdata.get("areaSize"),
      session?.user?.id,
    ],
  );
  return NextResponse.json({ res, randomInt });
}

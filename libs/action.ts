"use server";
import pool from "@/libs/config";

export async function getUsersAll(slug?: string) {
  try {
    const [res]: any = await pool.execute("SELECT * FROM post WHERE slug = ?", [
      slug,
    ]);
    const rows = res[0];
    return rows;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function searchByResult(slugArray: string[]) {
  const [category, category_type, province, district, subDistrict] = slugArray;

  let query = `
    SELECT 
      po.*, 
      p.name_th as province_name, 
      d.name_th as district_name,
      sd.name_th as sub_district_name
    FROM post po
    LEFT JOIN provinces p ON po.province = p.id
    LEFT JOIN districts d ON po.district = d.id
    LEFT JOIN sub_districts sd ON po.sub_district = sd.id
    WHERE 1=1
  `;

  const params: any[] = [];

  // กรองตามประเภทที่ดิน (ถ้า slug อยู่ในตาราง post)
  if (category) {
    query += " AND po.category = ?";
    params.push(category);
  }

  if (category_type) {
    query += " AND po.category_sell = ? OR po.category_rent = ?";
    params.push(category_type, category_type);
  }

  if (province) {
    query += " AND (p.id = ? OR p.name_th = ?)";
    params.push(province, decodeURIComponent(province));
  }
  if (district) {
    query += " AND (d.id = ? OR d.name_th = ?)";
    params.push(district, decodeURIComponent(district));
  }
  if (subDistrict) {
    query += " AND (sd.id = ? OR sd.name_th = ?)";
    params.push(subDistrict, decodeURIComponent(subDistrict));
  }
  try {
    const [res]: any = await pool.execute(query, params);
    return res;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

export async function getUsersTal(id?: number) {
  try {
    const [res]: any = await pool.execute(
      "SELECT tal FROM users WHERE id = ?",
      [id],
    );
    const rows = res[0].tal;
    return rows;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function provinceList(id?: number) {
  try {
    const [res]: any = await pool.execute(
      "SELECT name_th FROM provinces WHERE id = ?",
      [id || 1],
    );
    const rows = res[0].name_th;
    return rows;
  } catch (error) {
    console.error("Error fetching province:", error);
    return null;
  }
}

export async function districtList(provinceId: number, id?: number) {
  try {
    const [res]: any = await pool.execute(
      "SELECT name_th FROM districts WHERE province_id = ? AND id = ?",
      [provinceId, id || 1],
    );
    const rows = res[0].name_th;
    return rows;
  } catch (error) {
    console.error("Error fetching district:", error);
    return null;
  }
}

export async function subDistrictList(districtId: number, id?: number) {
  try {
    const [res]: any = await pool.execute(
      "SELECT name_th FROM sub_districts WHERE district_id = ? AND id = ?",
      [districtId, id || 1],
    );
    const rows = res[0].name_th;
    return rows;
  } catch (error) {
    console.error("Error fetching sub-district:", error);
    return null;
  }
}

export async function zipCodeList(subDistrictId: number) {
  try {
    const [res]: any = await pool.execute(
      "SELECT zip_code FROM sub_districts WHERE id = ?",
      [subDistrictId],
    );
    const rows = res[0].zip_code;
    return rows;
  } catch (error) {
    console.error("Error fetching zip code:", error);
    return null;
  }
}

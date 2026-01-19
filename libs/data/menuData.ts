import { Category, MenuItem } from "@/libs/types/menu";

export const menuData: MenuItem[] = [
  { name: "หน้าหลัก", href: "/" },
  {
    name: "ขาย",
    children: [
      { name: "ขายที่ดิน", href: "/ขายที่ดิน" },
      { name: "ขายคอนโด", href: "/ขายคอนโด" },
    ],
  },
  {
    name: "ให้เช่า",
    children: [{ name: "ให้เช่าที่ดิน", href: "/ให้เช่าที่ดิน" }],
  },
  { name: "ลงโฆษณา", href: "/" },
  {
    name: "ลงประกาศฟรี",
    children: [
      { name: "ลงประกาศฟรีขาย", href: "/" },
      { name: "ลงประกาศฟรีให้เช่า", href: "/" },
    ],
  },
];

export const CATEGORIES: Category[] = [
  { id: "land", label: "ที่ดิน" },
  { id: "condo", label: "คอนโด" },
  { id: "house", label: "บ้านเดี่ยว" },
  { id: "townhome", label: "ทาวน์โฮม/โรงแรม" },
  { id: "commercial", label: "อาคารพาณิชย์/ สำนักงาน" },
  { id: "warehouse", label: "โกดัง/โรงงาน" },
];

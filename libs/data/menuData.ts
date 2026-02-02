import { Category, Category_type, MenuItem } from "@/libs/types/menu";

export const menuData: MenuItem[] = [
  { name: "หน้าหลัก", href: "/" },
  {
    name: "ขาย",
    children: [
      { name: "ขายที่ดิน", href: "/landfor-sale" },
      { name: "ขายคอนโด", href: "/condo-for-sale" },
      { name: "ขายบ้านเดี่ยว", href: "/house-for-sale" },
      { name: "ขายทาวน์โฮม/โรงแรม", href: "/townhome-for-sale" },
      { name: "ขายอาคารพาณิชย์/ สำนักงาน", href: "/commercial-for-sale" },
      { name: "ขายโกดัง/โรงงาน", href: "/warehouse-for-sale" },
    ],
  },
  {
    name: "ให้เช่า",
    children: [
      { name: "ให้เช่าที่ดิน", href: "/landfor-rent" },
      { name: "ให้เช่าคอนโด", href: "/condo-for-rent" },
      { name: "ให้เช่าบ้านเดี่ยว", href: "/house-for-rent" },
      { name: "ให้เช่าทาวน์โฮม/โรงแรม", href: "/townhome-for-rent" },
      { name: "ให้เช่าอาคารพาณิชย์/ สำนักงาน", href: "/commercial-for-rent" },
      { name: "ให้เช่าโกดัง/โรงงาน", href: "/warehouse-for-rent" },
    ],
  },
  { name: "ลงโฆษณา", href: "/" },
  {
    name: "ลงประกาศฟรี",
    children: [
      { name: "ลงประกาศฟรีขาย", href: "/post-free/sell" },
      { name: "ลงประกาศฟรีให้เช่า", href: "/post-free/rent" },
    ],
  },
];

export const category_types: Category_type[] = [
  { id: "sell", label: "ขาย" },
  { id: "rent", label: "ให้เช่า" },
  { id: "sell", label: "ขายดาวน์" },
];

export const CATEGORIES: Category[] = [
  { id: "land", label: "ที่ดิน" },
  { id: "condo", label: "คอนโด" },
  { id: "house", label: "บ้านเดี่ยว" },
  { id: "townhome", label: "ทาวน์โฮม/โรงแรม" },
  { id: "commercial", label: "อาคารพาณิชย์/ สำนักงาน" },
  { id: "warehouse", label: "โกดัง/โรงงาน" },
];

import { MenuItem } from "@/libs/types/menu";

export const menuData: MenuItem[] = [
  { name: "หน้าหลัก", href: "/" },
  {
    name: "ขาย",
    children: [
      { name: "ขาย1", href: "/sell1" },
      { name: "ขาย2", href: "/sell2" },
    ],
  },
  {
    name: "ให้เช่า",
    children: [{ name: "ให้เช่า1", href: "/bau2" }],
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

import { MenuItem } from "@/libs/types/menu";
import { useOnClickOutside } from "@/util/hooks/useClickOutside";
import Link from "next/link";
import React, { useCallback, useRef, useState } from "react";

interface MenuItemRendererProps {
  item: MenuItem;
}

export default function Dropdown({ item }: MenuItemRendererProps) {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  // ตรวจสอบว่ามีรายการย่อยหรือไม่
  const hasChildren = item.children && item.children.length > 0;
  const menuRef = useRef<HTMLLIElement>(null);

  // 2. Hook สำหรับจัดการการคลิกนอกพื้นที่
  useOnClickOutside(menuRef as React.RefObject<HTMLElement>, () => {
    if (isSubMenuOpen) setIsSubMenuOpen(false);
  });

  // 1. ถ้าเป็นรายการ Link (ไม่มีเมนูย่อย)
  if (!hasChildren) {
    return (
      <li>
        <Link
          href={item.href || "#"}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          onClick={() => setIsSubMenuOpen(false)}
        >
          {item.name}
        </Link>
      </li>
    );
  }

  return (
    <li
      ref={menuRef}
      className={`dropdown ${isSubMenuOpen ? "dropdown-open" : ""}`}
    >
      <button
        className="flex justify-between items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
      >
        {item.name}
        <svg
          className={`w-4 h-4 transition-transform ${
            isSubMenuOpen ? "rotate-180" : "rotate-0"
          }`} // ⬅️ หมุน Icon เมื่อเปิด/ปิด
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {/* Panel ของ Dropdown ย่อย */}
      {isSubMenuOpen && (
        <ul
          className={`p-2 shadow menu dropdown-content mt-1 z-10 top-full left-0 bg-base-100 rounded-box w-52 absolute `}
        >
          {/* 3. การวนซ้ำ (Recursion) */}
          {item.children!.map((childItem, index) => (
            // เรียก Component ตัวเดิมสำหรับเมนูย่อย
            <Dropdown key={index} item={childItem} />
          ))}
        </ul>
      )}
    </li>
  );
}

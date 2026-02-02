// components/Breadcrumbs.tsx

import Link from "next/link";
import { FaChevronRight, FaHome } from "react-icons/fa";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav
      className="flex mb-5 overflow-x-auto whitespace-nowrap py-2"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="text-gray-500 hover:text-orange-600 inline-flex items-center text-sm font-medium"
          >
            <FaHome className="w-4 h-4 mr-2" />
            หน้าแรก
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index}>
            <div className="flex items-center">
              <FaChevronRight className="w-4 h-4 text-gray-400" />
              {item.href ? (
                <Link
                  href={item.href}
                  className="ml-1 text-sm font-medium text-gray-500 hover:text-orange-600 md:ml-2"
                >
                  {decodeURIComponent(item.label)}
                </Link>
              ) : (
                <span className="ml-1 text-sm font-bold text-orange-600 md:ml-2">
                  {decodeURIComponent(item.label)}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}

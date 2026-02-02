import Breadcrumbs from "@/components/Breadcrumbs";
import { searchByResult } from "@/libs/action";
import { listing } from "@/libs/types/menu";
import { formatCurrency } from "@/libs/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function SearchPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const { slug } = await params;
  const decodedSlugs = slug.map((s) => decodeURIComponent(s));
  const results = await searchByResult(decodedSlugs);

  return (
    <div className="container mx-auto p-8 ">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          ผลการค้นหา: {decodedSlugs.join(" / ")}
        </h1>
        <p className="text-gray-500">พบทั้งหมด {results.length} รายการ</p>
      </header>
      <div className="my-5 ">
        {results.length > 0 ? (
          <>
            {results.map((post: listing) => (
              <Link
                key={post.id}
                href={`/detail/${post.slug}`}
                target="_blank"
                className="flex items-center gap-4  border rounded-2xl"
              >
                <div className="relative overflow-hidden w-full h-[300px] rounded-l-xl">
                  {post.images && post.images.length > 0 ? (
                    <>
                      <Image
                        src={`/users${post.images.split(",")[0]}`}
                        alt="image"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </div>

                <div className="mx-5">
                  <span className="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                    {post.category == "sell" ? "ขาย" : "ให้เช่า"}
                  </span>
                  <h2 className="text-xl font-semibold">{post.title}</h2>
                  <p className="text-gray-600">{post.description}</p>
                  <p className="text-gray-800">
                    ราคา{post.category == "sell" ? "ขาย" : "ให้เช่า"}{" "}
                    <span className="text-orange-500">
                      {formatCurrency(post.price)} บาท{" "}
                      {post.category == "rent" ? "/ เดือน" : ""}
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </>
        ) : (
          <>
            <div className="text-center text-gray-500">
              ไม่พบผลลัพธ์การค้นหา
            </div>
          </>
        )}
      </div>
    </div>
  );
}

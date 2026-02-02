import ImageGallery from "@/components/ImageGallery";
import connect from "@/libs/config";
import {
  districtList,
  getUsersAll,
  getUsersTal,
  provinceList,
  subDistrictList,
} from "@/libs/action";
import { formatCurrency } from "@/libs/utils";
import { notFound } from "next/navigation";
import React from "react";
import { get } from "http";
import Link from "next/link";
import { listing } from "@/libs/types/menu";
import Breadcrumbs from "@/components/Breadcrumbs";

export default async function DetailListingPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const post = await getUsersAll(decodedSlug);

  const images = post ? post.images.split(",") : [];
  if (!post) notFound();
  return (
    <div className="container mx-auto p-8 ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <div className="my-5 "></div>
          {images && images.length > 0 ? (
            <>
              <ImageGallery images={images} />
            </>
          ) : (
            <div className="bg-gray-200 rounded-2xl w-full h-full flex items-center justify-center">
              ไม่มีรูปภาพ
            </div>
          )}
          <div className="my-5 py-2.5">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="mb-4">{post.description}</p>
            <p className="text-xl font-semibold">
              ราคา{post.category == "sell" ? "ขาย" : "ให้เช่า"}{" "}
              <span className="text-orange-500">
                {formatCurrency(post.price)} บาท{" "}
                {post.category == "rent" ? "/ เดือน" : ""}
              </span>
            </p>
            <p className="text-xl font-semibold">
              สถานที่ตั้ง {provinceList(post.province)} /{" "}
              {districtList(post.province, post.district)} /{" "}
              {subDistrictList(post.district, post.sub_district)}
            </p>
            <p className="text-xl font-semibold">
              ขนาดพื่นที่ {post.area_size}
            </p>

            <div role="alert" className="alert alert-warning alert-soft my-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>
                Teedindd.com เป็นพื้นที่ฝากประกาศเท่านั้น
                กรุณาตรวจสอบข้อมูลอย่างรอบคอบ เพื่อป้องกันการถูกหลอกลวง
              </span>
            </div>
          </div>
          <div className="my-5">
            <h2 className="text-2xl font-bold mb-4">ข้อมูลติดต่อ</h2>
            <p>เบอร์โทร {getUsersTal(post.users_id)}</p>
          </div>
        </div>
        <div className="col-span-1">
          <div className="bg-gray-200 rounded-2xl w-full h-full p-5 font-bold text-2xl">
            ประกาศแนะนำ
          </div>
        </div>
      </div>
    </div>
  );
}

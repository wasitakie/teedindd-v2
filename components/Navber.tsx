"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Navber() {
  const { data: sessionGoogle } = useSession();
  console.log("Session in Navber:", sessionGoogle);
  return (
    <>
      <div className="flex justify-between items-center p-4 shadow-md bg-[#F4F4F4] ">
        <div className="">
          <Image src="/images/teendd.png" alt="logo" width={150} height={100} />
        </div>
        <div className="flex gap-6">
          <Link href={"/"}>หน้าแรก</Link>
          <Link href="">ขาย</Link>
          <Link href="">ให้เช่า</Link>
          <Link href="">ลงโฆษณา</Link>
          <Link href="">ลงประกาศฟรี</Link>
        </div>
        <div className="flex gap-4">
          {sessionGoogle ? (
            <div className="bg-red-500">{sessionGoogle?.user?.email}</div>
          ) : (
            <Link href={"/signin/user"}>
              <button className="btn btn-[#000000] btn-soft btn-sm">
                เข้าสู่ระบบ
              </button>
            </Link>
          )}

          <Link href={"/user/signup"}>
            <button className="btn btn-primary btn-sm">สมัครสมาชิก</button>
          </Link>
        </div>
      </div>
    </>
  );
}

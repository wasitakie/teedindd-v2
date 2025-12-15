"use client";

import { menuData } from "@/libs/data/menuData";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import Dropdown from "./Dropdown";
import { tree } from "next/dist/build/templates/app-page";

export default function Navber() {
  const [openSubMenuId, setOpenSubMenuId] = useState<number | null>(null);
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut({
      redirect: true,
      callbackUrl: "/",
    });
  };
  return (
    <>
      <div className="flex justify-between items-center p-4 shadow-md bg-[#F4F4F4] ">
        <div className="">
          <Image src="/images/teendd.png" alt="logo" width={150} height={100} />
        </div>
        <div className="flex gap-6">
          <ul className="menu menu-horizontal px-1 ">
            {menuData.map((item, index) => (
              <Dropdown key={index} item={item} />
            ))}
          </ul>
        </div>
        <div className="flex gap-4">
          {session ? (
            <div className="">
              <div className="avatar w-10 rounded-full">
                <img
                  alt={`${session.user?.name}` || ""}
                  src={`${session.user?.image}` || ""}
                />
              </div>
              {session.user?.name}
              {session?.user?.email}
              <button className="btn btn-error" onClick={handleSignOut}>
                signout
              </button>
            </div>
          ) : (
            <>
              <Link href={"/signin"}>
                <button className="btn btn-[#000000] btn-soft btn-sm">
                  เข้าสู่ระบบ
                </button>
              </Link>
              <Link href={"/signup"}>
                <button className="btn btn-primary btn-sm">สมัครสมาชิก</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

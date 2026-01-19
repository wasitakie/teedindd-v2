"use client";

import { menuData } from "@/libs/data/menuData";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import Dropdown from "./Dropdown";
import { Router } from "next/router";
import toast from "react-hot-toast";
import { GoSignOut } from "react-icons/go";

export default function Navber() {
  const router = useRouter();
  const [openSubMenuId, setOpenSubMenuId] = useState<number | null>(null);
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut({
      redirect: false,
    });
    router.push("/");
    toast.success("คุณออกจากระบบแล้ว");
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
        <div className="flex gap-4 ">
          <Link href={"/post-free"}>
            <button className="btn bg-red-500 btn-sm text-white">
              ลงประกาศฟรี
            </button>
          </Link>
          {session ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={session.user?.image || ""}
                    width={50}
                    height={50}
                  />
                </div>
              </div>
              <ul
                tabIndex={-1}
                className="menu menu-md dropdown-content bg-base-100 rounded-box z-1 mt-3 w-70 p-2 shadow"
              >
                <li>
                  <Link href={"/users"} className="justify-between">
                    โปรไฟล์
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link href={"/myPosts"}>ประกาศของฉัน</Link>
                </li>
                <li>
                  <Link href={"/"}>Settings</Link>
                </li>
                <li>
                  <a onClick={handleSignOut}>ออกจากระบบ</a>
                </li>
              </ul>
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

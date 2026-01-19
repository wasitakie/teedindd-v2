"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

export default function Page() {
  const { data: session } = useSession();

  if (!session)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-xl">
        กรุณาเข้าสู่ระบบ หรือ สมัครสมาชิก ก่อนนะครับ
      </div>
    );

  return (
    <div>
      <div className="">google {session?.user?.name}</div>
    </div>
  );
}

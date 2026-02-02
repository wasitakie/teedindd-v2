"use client";

import { Signin, Signup } from "@/components/Button";
import AddPostForm from "@/components/AddPostForm";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

export default function PostFreePage() {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-xl">
        กรุณาเข้าสู่ระบบ หรือ สมัครสมาชิก ก่อนนะครับ
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 md:px-12 my-12">
      <h1 className="text-2xl font-semibold">ลงประกาศฟรี ขาย/ทีดิน คอนโด</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
        tempore numquam sunt quo incidunt laborum ex ut? Eligendi consequuntur,
        explicabo nostrum deserunt praesentium rem dolore eius aliquam at fuga
        dolores!
      </p>
      <div className="border rounded-xl my-4 border-gray-400">
        {session ? (
          <AddPostForm />
        ) : (
          <>
            <div className="m-4 flex gap-4 ">
              <Signin />
              <Signup />
              <p>*สมัครสมาชิกก่อนลงประกาศ หากเป็นสมาชิกแล้วคลิกเข้าสู่ระบบ </p>
            </div>
          </>
        )}
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, ex
        repellat. Temporibus, alias exercitationem, atque repudiandae et
        voluptatum consectetur quae mollitia quia asperiores perferendis
        perspiciatis debitis illum eius cum sapiente!
      </p>
    </div>
  );
}

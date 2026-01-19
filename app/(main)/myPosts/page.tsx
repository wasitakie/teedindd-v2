"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function MyPosts() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  //   if (!session)
  //     return (
  //       <div className="flex justify-center items-center h-screen text-gray-500 text-xl">
  //         กรุณาเข้าสู่ระบบ หรือ สมัครสมาชิก ก่อนนะครับ
  //       </div>
  //     );

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/users/listings/" + session?.user?.id);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto p-8 ">
      <div className="flex justify-between items-center">
        <div className="my-3">
          <h1 className="text-2xl font-semibold">ประกาศของฉัน</h1>
          <span className="text-gray-600">สวัสดี, {session?.user?.name}</span>
        </div>
        <Link href={"/post-free"} className="btn btn-primary">
          เพิ่มลงประกาศใหม่
        </Link>
      </div>
      <div role="alert" className="alert">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-info h-6 w-6 shrink-0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>
          คุณกำลังใช้แบบลงประกาศฟรี ถ้าคุณต้องการลงประกาศที่มีค่าใช้จ่าย
          โปรดติดต่อเบอร์โทร ----
        </span>
      </div>
      <div className="my-5">
        {/* Post list will go here */}
        {posts.length === 0 ? (
          <div className="text-gray-500">คุณยังไม่มีประกาศในขณะนี้</div>
        ) : (
          posts.map((post: any) => (
            <Link
              key={post.id}
              href={`/${post.post_number}`}
              className="flex my-4 px-4 py-4 border rounded-2xl p"
            >
              <div className="w-[200px] h-full  rounded-2xl ">
                {post.images && post.images.length > 0 ? (
                  <>
                    <img
                      src={`/users/${post.images.split(",")[0]}`}
                      alt="Post Image"
                      className="rounded-l-2xl"
                      width={200}
                      height={200}
                    />
                  </>
                ) : (
                  <></>
                )}
              </div>

              <div className="mx-5">
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="text-gray-600">{post.description}</p>
                <p className="text-gray-600">
                  ประกาศเลขที่: {post.post_number}
                </p>
                <p className="text-gray-800">ราคา: {post.price} บาท</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

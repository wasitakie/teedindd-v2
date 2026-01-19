"use client";

import { useEffect, useState } from "react";
import Banner from "@/components/Banner";
import Search from "@/components/Search";
import Image from "next/image";
import Link from "next/link";

interface User {
  id: number;
  email: string;
  password: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const res = await fetch("/users/");
    const data = await res.json();
    setUsers(data);
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
      <Banner />
      {users.map((user) => (
        <div className="" key={user.id}>
          {user.email}
        </div>
      ))}

      <div className="container my-12 mx-auto px-4 md:px-12 ">
        {" "}
        <Search />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <Link
            href={`/types/1`}
            className="cursor-pointer border border-gray-400 rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200 flex flex-col flex-1"
          >
            <Image
              src="https://images.unsplash.com/photo-1475855581690-80accde3ae2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
              alt="Shoes"
              width={200}
              height={200}
              className=" w-full object-cover rounded-t-lg"
            />
            <div className="p-4">
              <span className="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                Highlight
              </span>
              <h2 className="mt-2 mb-2  font-bold">
                Purus Ullamcorper Inceptos Nibh
              </h2>
              <p className="text-sm">
                Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                Donec ullamcorper nulla non metus auctor fringilla.
              </p>
              <div className="mt-3 flex items-center">
                <span className="text-sm font-semibold">ขาย</span>&nbsp;
                <span className="font-bold text-xl">45,00</span>&nbsp;
                <span className="text-sm font-semibold">บาท</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

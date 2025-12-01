"use client";

import { useEffect, useState } from "react";
import Banner from "@/components/Banner";

interface User {
  id: number;
  email: string;
  password: string;
}

export default function Page() {
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
      กำหนดขนาดของรูปภาพ ณ จุดพักต่างๆ
      ใช้โดยเบราว์เซอร์เพื่อเลือกขนาดที่เหมาะสมที่สุดจากไฟล์ที่สร้างsrcsetขึ้น
    </>
  );
}

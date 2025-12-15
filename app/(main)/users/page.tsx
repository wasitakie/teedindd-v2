"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

export default function Page() {
  const { data: session } = useSession();

  if (!session) return <div className="">not auth</div>;

  return (
    <div>
      <div className="">google {session?.user?.email}</div>
    </div>
  );
}

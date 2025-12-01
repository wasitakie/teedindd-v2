import { getSessionData } from "@/libs/auth.s";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page() {
  const user = await getSessionData();

  if (!user) {
    redirect("/signin/user");
  }
  console.log("Session ID from cookies:", user?.id);
  return (
    <div>
      <div>{user?.email}</div>
    </div>
  );
}

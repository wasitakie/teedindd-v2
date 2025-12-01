import { getSessionAdminData } from "@/libs/auth.s";
import { redirect } from "next/navigation";

import React from "react";

export default async function Page() {
  const admin = await getSessionAdminData();

  if (admin?.role !== "admin") {
    redirect("/signin/admin");
  }

  return <div>page dashboard{admin?.email}</div>;
}

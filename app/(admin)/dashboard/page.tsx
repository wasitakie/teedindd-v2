import { getSessionAdminData } from "@/libs/auth.s";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export default async function Page() {
  const admin = await getSessionAdminData();

  if (admin?.role !== "admin") {
    redirect("/signin/admin");
  }

  return <DashboardClient />;
}

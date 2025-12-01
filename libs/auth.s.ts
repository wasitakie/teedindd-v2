import { cookies } from "next/headers";
import connect from "./config";

interface UserData {
  id: number;
  email: string;
  password: string;
  role: string;
}

export async function getSessionData(): Promise<UserData | null> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session-id")?.value;
  const sessionRole = cookieStore.get("session-role")?.value;

  if (!sessionId) {
    return null;
  }

  try {
    const [res]: any = await connect.execute(
      "SELECT * FROM users WHERE id = ?",
      [sessionId]
    );
    const data = res[0];

    if (!data) {
      return null;
    }

    return data;
  } catch (err) {
    console.log("Error fetching users:", err);
    return null;
  }
}

export async function getSessionAdminData(): Promise<UserData | null> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionAdmin-id")?.value;
  const sessionRole = cookieStore.get("session-role")?.value;

  if (!sessionId) {
    return null;
  }

  try {
    const [res]: any = await connect.execute(
      "SELECT * FROM admin WHERE id = ? AND role = ?",
      [sessionId, sessionRole]
    );
    const data = res[0];

    if (!data) {
      return null;
    }

    return data;
  } catch (err) {
    console.log("Error fetching users:", err);
    return null;
  }
}

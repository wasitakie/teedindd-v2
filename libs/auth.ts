import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";
import pool from "@/libs/config";
import { compare } from "bcrypt";
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const [response]: any = await pool.execute(
          "SELECT * FROM users WHERE email = ? ",
          [credentials?.email],
        );
        const user = await response[0];
        if (user && user.password) {
          // ตรวจสอบ role - ต้องเป็น user หรือ editor เท่านั้น (ไม่ใช่ admin)
          if (user.role === "admin") {
            // Admin ไม่สามารถ login ผ่าน NextAuth ได้ ต้องใช้ /signin/admin
            return null;
          }

          const passwordCorrect = await compare(
            credentials?.password || "",
            user.password,
          );
          if (passwordCorrect) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              image: user.image,
            };
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 วัน
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // เพิ่มข้อมูลที่ต้องการลงใน session object
      if (
        (account?.provider === "google" || account?.provider === "facebook") &&
        user.email
      ) {
        try {
          const [rows]: any = await pool.execute(
            "SELECT id,status,role FROM users WHERE email = ?",
            [user.email],
          );
          if (rows.length > 0) {
            const data = rows[0];

            // ตรวจสอบ role - ต้องเป็น user หรือ editor เท่านั้น (ไม่ใช่ admin)
            if (data.role === "admin") {
              // Admin ไม่สามารถ login ผ่าน NextAuth ได้
              return false;
            }

            if (data.status === 0) {
              return false; // ❌ ปฏิเสธการเข้าสู่ระบบ
            }
            await pool.execute(
              "UPDATE users SET name = ?, email = ?,image = ?,status = 1 WHERE id = ?",
              [user.name, user.email, user.image, data.id],
            );

            user.id = data.id;
          } else {
            // สร้าง user ใหม่ - role default เป็น 'user'
            const defaultStatus = 1;
            const defaultRole = "user";
            const [result]: any = await pool.execute(
              "INSERT INTO users (name,email,image,status,role) VALUES (?,?,?,?,?)",
              [user.name, user.email, user.image, defaultStatus, defaultRole],
            );
            user.id = result.insertId;
          }
          return true;
        } catch (err) {
          console.error("Database query error:", err);
          return false;
        }
      }
      if (account?.provider === "credentials") {
        // ตรวจสอบ role สำหรับ credentials login (ตรวจสอบแล้วใน authorize)
        return true;
      }
      return false;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id.toString();
      }
      return token;
    },

    // 💡 ต้องเพิ่ม Session Callback เพื่อให้ ID ถูกส่งไปยัง Client
    async session({ session, token }: any) {
      if (session.user && token.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};

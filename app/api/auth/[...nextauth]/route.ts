import connect from "@/libs/config";
import { compare } from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
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
        const [response]: any = await connect.execute(
          "SELECT * FROM users WHERE email = ? ",
          [credentials?.email]
        );
        const user = await response[0];
        if (user && user.password) {
          const passwordCorrect = await compare(
            credentials?.password || "",
            user.password
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
          const [rows]: any = await connect.execute(
            "SELECT id,status FROM users WHERE email = ?",
            [user.email]
          );
          if (rows.length > 0) {
            const data = rows[0];
            if (data.status === 0) {
              return false; // ❌ ปฏิเสธการเข้าสู่ระบบ
            }
            await connect.execute(
              "UPDATE users SET name = ?, email = ?,image = ?,status = 1 WHERE id = ?",
              [user.name, user.email, user.image, data.id]
            );

            user.id = data.id;
          } else {
            const defaultStatus = 1;
            const [result]: any = await connect.execute(
              "INSERT INTO users (name,email,image,status) VALUES (?,?,?,?)",
              [user.name, user.email, user.image, defaultStatus]
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

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

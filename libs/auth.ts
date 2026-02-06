import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import pool from "@/libs/config";
import { compare } from "bcrypt";
import { RowDataPacket } from "mysql2";

type DBUser = {
  id: number;
  name: string;
  email: string;
  password?: string;
  image?: string;
  role: "user" | "editor" | "admin";
  status: number;
};
type DBUserRow = DBUser & RowDataPacket;

export const authOptions: NextAuthOptions = {
  debug: true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const [rows] = await pool.execute<DBUserRow[]>(
          "SELECT * FROM users WHERE email = ? LIMIT 1",
          [credentials.email],
        );

        const user = rows[0];
        if (!user || !user.password) return null;

        // ❌ admin login ไม่ได้
        if (user.role === "admin") {
          return null;
        }
        if (user.status === 0) {
          return null;
        }

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          image: user.image ?? null,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  callbacks: {
    async signIn({ user, account }) {
      // Social login
      if (
        (account?.provider === "google" || account?.provider === "facebook") &&
        user.email
      ) {
        const [rows] = await pool.execute<DBUserRow[]>(
          "SELECT id, role, status FROM users WHERE email = ? LIMIT 1",
          [user.email],
        );

        if (rows.length > 0) {
          const dbUser = rows[0];

          if (dbUser.role === "admin") {
            return "/signin?error=ADMIN_NOT_ALLOWED";
          }
          if (dbUser.status === 0) {
            return "/signin?error=ACCOUNT_DISABLED";
          }

          await pool.execute(
            "UPDATE users SET name = ?, image = ?, status = 1 WHERE id = ?",
            [user.name, user.image, dbUser.id],
          );

          user.id = dbUser.id.toString();
        } else {
          const [result] = await pool.execute<any>(
            "INSERT INTO users (name,email,image,status,role) VALUES (?,?,?,?,?)",
            [user.name, user.email, user.image, 1, "user"],
          );
          user.id = result.insertId.toString();
        }

        return true;
      }

      // Credentials login ผ่าน authorize แล้ว
      if (account?.provider === "credentials") {
        return true;
      }

      return false;
    },

    async jwt({ token, user }) {
      if (user?.id) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/signin",
    error: "/signin",
  },
};

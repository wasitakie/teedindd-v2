import { authOptions } from "@/libs/auth";
import pool from "@/libs/config";
import { compare } from "bcrypt";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

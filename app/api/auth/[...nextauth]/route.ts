import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const headler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 วัน
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // เพิ่มข้อมูลที่ต้องการลงใน session object
      if (account?.provider === "google" && user.email) {
        return true;
      }
      return false;
    },
  },
  pages: {
    signIn: "/user/signin",
  },
});

export { headler as GET, headler as POST };

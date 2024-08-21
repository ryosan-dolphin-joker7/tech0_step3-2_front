import NextAuth from "next-auth/next";
import { authOptions } from "@/lib/next-auth/authOptions";

const handler = NextAuth(authOptions);

console.log("API Route Accessed");
console.log("NextAuth API Route is being accessed");
console.log("API Route Hit: /api/auth/[...nextauth]");

export { handler as GET, handler as POST };

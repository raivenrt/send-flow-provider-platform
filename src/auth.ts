import bcrypt from "bcrypt";

import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "database",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request) {
        if (!credentials.email || !credentials.password)
          throw new Error("Invalid credentials");
        else if (
          typeof credentials.email !== "string" ||
          typeof credentials.password !== "string"
        )
          throw new Error("Invalid email or password type");

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) throw new Error("User not found");

        const validPassword = await bcrypt.compare(credentials.password, user.password);
        if (!validPassword) throw new Error("Invalid email or password");

        if (!user.emailVerified) throw new Error("Email not verified");

        return user;
      },
    }),
  ],
});

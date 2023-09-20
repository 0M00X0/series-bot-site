import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "db";

export const authOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID ?? "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    session: ({ session, user }: { session: any; user: any }) => {
      if (user) {
        session.user = { ...session.user, role: user.role };
        session.user = { ...session.user, id: user.id };
      }
      return session;
    },
    // جلب id ال provider
  },
  adapter: PrismaAdapter(prisma) as any,
  secret: process.env.NEXTAUTH_SECRET || "",
};



const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
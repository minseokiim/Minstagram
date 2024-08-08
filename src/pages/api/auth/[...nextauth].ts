import { addUser } from "@/service/user";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_SECRET || "",
    }),
  ],
  // https://next-auth.js.org/configuration/pages
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    async signIn({ user: { id, name, image, email } }) {
      if (!email) {
        return false;
      }

      addUser({
        id,
        name: name || "",
        email,
        image,
        username: email?.split("@")[0],
      });
      return true;
    },
    session({ session }) {
      const user = session?.user;
      if (user) {
        session.user = {
          ...user,
          username: user.email?.split("@")[0] || "",
        };
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);

// https://next-auth.js.org/getting-started/typescript

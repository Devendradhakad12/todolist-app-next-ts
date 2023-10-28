import { ConnectToDB } from "@/lib/database";
import { User } from "@/models/user.model";

import NextAuth from "next-auth/next";
import Google from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRETE!,
    }),
  ],

  callbacks: {
    async session({ session }) {
      
      const seesionUser = await User.findOne({
        email: session.user?.email,
      });

      const sessionWithId = {
        ...session,
        user: {
          ...session.user,
          id: seesionUser?._id?.toString(),
        },
      };
      session = sessionWithId;
      return session;
    },

    async signIn({ profile }) {
      try {
        await ConnectToDB();

        const userExist = await User.findOne({
          email: profile?.email,
        });
        if (!userExist) {
          await User.create({
            email: profile?.email,
            username: profile?.name?.replace(" ", "").toLowerCase(),
            image: profile?.image,
          });
        }
        return true;
      } catch (error) {
        console.log("SIGNUP_ERROR", error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };

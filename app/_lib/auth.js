import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user.email); //checks the db if the user is an existing guest

        if (!existingGuest)
          await createGuest({ email: user.email, fullName: user.name }); //if not an existing guest, create a new guest (at the bottom of data-service.js)

        return true;
      } catch {
        return false;
      }
    },
    async session({ session, user }) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session; //adds the guestId to the session object, which is used to allocate all the bookings to a specific guest by ID
    },
  },
  pages: {
    signIn: "/login", //if everything is good, then redirect to the custom login page
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);

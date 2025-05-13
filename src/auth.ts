import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        password: {},
      },
      authorize: (credentials) => {
        const ALLOWED_PASSWORDS = ["5773", "7538", "7561", "7587", "7595"];

        if (!ALLOWED_PASSWORDS.includes(String(credentials.password))) {
          return null;
        }
        return {
          name: String(credentials.password),
        };
      },
    }),
  ],
  session: {
    maxAge: 5,
  },
});

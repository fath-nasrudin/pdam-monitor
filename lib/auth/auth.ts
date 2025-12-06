import { userLoginSchema } from "@/features/user/user.schema";
import { login } from "@/features/user/user.service";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {
          type: "username",
          label: "Username",
          placeholder: "username kamu",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "*****",
        },
      },
      authorize: async (credentials) => {
        let user = null;
        const cred = await userLoginSchema.parseAsync(credentials);

        user = await login(cred);

        return user;
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      // DI SINI tempat atur JWT
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.role = user.role;
      }
      return token;
    },

    session: async ({ session, token }) => {
      session.user.username = token.username;
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
});

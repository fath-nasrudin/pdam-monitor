import { User as IUser } from "@/features/user/user.schema";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: IUser["id"];
    username: IUser["username"];
  }

  interface Session {
    user: {
      id: User["id"];
      username: User["username"];
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
  }
}

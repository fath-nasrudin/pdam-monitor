import { userRegisterSchema, UserSafe } from "@/features/user/user.schema";
import { responseError, responseSuccess } from "@/lib/api/response";
import { auth } from "@/lib/auth/auth";
import { PERMISSIONS } from "@/lib/auth/permission/permission.constant";
import { can } from "@/lib/auth/permission/permission.util";
import { prisma } from "@/lib/prisma";
import { saltAndHashPassword } from "@/lib/utils/password";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    can(session, PERMISSIONS.user.create);

    const body = await req.json();
    const data = await userRegisterSchema.parseAsync(body);
    const hashedPw = await saltAndHashPassword(data.password);

    const user: UserSafe = await prisma.user.create({
      data: { ...data, password: hashedPw },
      omit: { password: true },
    });
    return responseSuccess({ data: user });
  } catch (error) {
    console.error(error);
    return responseError({ error });
  }
}

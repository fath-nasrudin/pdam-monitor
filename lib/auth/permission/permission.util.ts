import { Session } from "next-auth";
import { PERMISSIONS } from "./permission.constant";

const userPermissions = {
  USER: [PERMISSIONS.user.read],
  ADMIN: ["*"],
};

export function can(session: Session | null, permission: string) {
  if (!session) throw new Error("Not Authenticated");
  const perms = userPermissions[session.user.role];

  //   admin check
  if (perms.includes("*")) return true;

  if (perms.includes(permission)) return true;
  throw new Error("Not Authorized");
}

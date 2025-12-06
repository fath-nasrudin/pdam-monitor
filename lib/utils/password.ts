import { genSalt, hash } from "bcrypt-ts";

export async function saltAndHashPassword(password: string) {
  const salt = await genSalt(10);
  return hash(password, salt);
}

export async function compare(password: string, hashedPassword: string) {
  return compare(password, hashedPassword);
}

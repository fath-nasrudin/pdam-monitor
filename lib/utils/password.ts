import { genSalt, hash, compare as bcryptCompare } from "bcrypt-ts";

export async function saltAndHashPassword(password: string) {
  const salt = await genSalt(10);
  return hash(password, salt);
}

export async function compare(password: string, hashedPassword: string) {
  return bcryptCompare(password, hashedPassword);
}

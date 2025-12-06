"use client";
import { signIn } from "next-auth/react";

export function LoginForm() {
  const credentialsAction = async (formData: FormData) => {
    const username = formData.get("username");
    const password = formData.get("password");

    await signIn("credentials", {
      username,
      password,
    });
  };

  return (
    <form action={credentialsAction}>
      <label htmlFor="credentials-username">
        Username
        <input type="text" id="credentials-username" name="username" />
      </label>
      <label htmlFor="credentials-password">
        Password
        <input type="password" id="credentials-password" name="password" />
      </label>
      <input type="submit" value="Sign In" />
    </form>
  );
}

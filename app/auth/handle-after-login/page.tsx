import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export default async function TestPage() {
  const session = await auth();

  if (!session) return <div>No Session</div>;
  if (session.user.role === "ADMIN") redirect("/dashboard");
  if (session.user.role === "USER") redirect("/me");

  return (
    <div>
      Hellow
      <p>Test</p>
      <p>{session.user?.id}</p>
      <p>{JSON.stringify(session.user)}</p>
    </div>
  );
}

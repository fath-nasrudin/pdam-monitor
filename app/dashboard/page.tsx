import { auth } from "@/lib/auth/auth";

export default async function DashboardPage() {
  const session = await auth();

  // should return not authorized page
  if (session?.user.role !== "ADMIN") return <p>NOT AUTHORIZED</p>;

  return (
    <div>
      <p>This is the admin page</p>
      <p>{JSON.stringify(session?.user)}</p>
    </div>
  );
}

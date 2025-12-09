import { auth } from "@/lib/auth/auth";

export default async function DashboardPage() {
  const session = await auth();

  // should return not authorized page
  if (session?.user?.role !== "USER") return <p>NOT AUTHORIZED</p>;

  return (
    <div>
      <p>This is the user page</p>
      <p>Nama Pengguna: {session.user.username}</p>
    </div>
  );
}

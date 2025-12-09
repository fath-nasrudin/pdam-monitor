import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen p-8 flex gap-4 flex-col items-center justify-center ">
      <h1 className="text-5xl font-bold">PPAS Web</h1>
      <Link href={ROUTES.auth.login.path}>
        <Button>Login</Button>
      </Link>
    </div>
  );
}

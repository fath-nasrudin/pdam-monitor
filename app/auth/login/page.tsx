import { LoginForm } from "@/features/auth/components/login-form-2";

export default function LoginPage() {
  // return <p>Test</p>;
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}

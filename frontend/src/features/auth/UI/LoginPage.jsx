import { AuthForm } from "./AuthForm.jsx";

export function LoginPage() {
  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#74907f]">Welcome back</p>
      <h2 className="mt-3 text-[30px] font-medium tracking-[-0.05em] text-[#1d2b23]">Sign in to Downbot</h2>
      <p className="mt-2 text-sm leading-6 text-[#829087]">Your next good idea is just a conversation away.</p>
      <AuthForm mode="login" />
    </>
  );
}

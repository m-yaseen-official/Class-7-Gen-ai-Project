import { AuthForm } from "./AuthForm.jsx";

export function RegisterPage() {
  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#74907f]">Get started</p>
      <h2 className="mt-3 text-[30px] font-medium tracking-[-0.05em] text-[#1d2b23]">Create your account</h2>
      <p className="mt-2 text-sm leading-6 text-[#829087]">A little more room for your best thinking.</p>
      <AuthForm mode="register" />
    </>
  );
}

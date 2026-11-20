import { LogOut, Sparkles } from "lucide-react";
import { useAuth } from "../hooks/useAuth.js";
import { BrandMark } from "./BrandMark.jsx";

export function WelcomePage() {
  const { user, logout } = useAuth();

  return (
    <main className="min-h-screen bg-[#f6f7f5] px-6 py-6 text-[#18231e] sm:px-10 lg:px-14">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between">
        <BrandMark />
        <button
          className="inline-flex items-center gap-2 rounded-xl border border-[#e1e7e2] bg-white px-4 py-2.5 text-sm font-medium text-[#52655b] transition hover:border-[#cbd8ce] hover:text-[#285b48]"
          onClick={logout}
          type="button"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
      <section className="mx-auto flex min-h-[75vh] max-w-3xl flex-col items-center justify-center text-center">
        <div className="grid size-14 place-items-center rounded-2xl bg-[#e7efe9] text-[#285b48]">
          <Sparkles size={24} />
        </div>
        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.16em] text-[#74907f]">Your workspace is ready</p>
        <h1 className="mt-3 text-4xl font-medium tracking-[-0.06em] sm:text-5xl">
          Welcome, {user?.name}.
        </h1>
        <p className="mt-4 max-w-md text-base leading-7 text-[#718078]">
          You&apos;re signed in to Downbot. Your AI workspace is ready when you are.
        </p>
      </section>
    </main>
  );
}

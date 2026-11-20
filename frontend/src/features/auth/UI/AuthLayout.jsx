import { BrandMark } from "./BrandMark.jsx";

export function AuthLayout({ children }) {
  return (
    <main className="min-h-screen bg-[#f6f7f5] text-[#18231e]">
      <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col px-6 py-6 sm:px-10 lg:px-14">
        <header className="flex items-center justify-between">
          <BrandMark />
          <p className="text-xs font-medium text-[#718078]">A calmer way to work with AI</p>
        </header>

        <div className="grid flex-1 items-center gap-14 py-14 lg:grid-cols-[1fr_0.85fr] lg:gap-20 lg:py-12">
          <section className="hidden max-w-xl lg:block">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#dce4de] bg-white/70 px-3.5 py-2 text-xs font-medium text-[#52655b]">
              <span className="size-1.5 rounded-full bg-[#70a982]" />
              Your AI workspace
            </div>
            <h1 className="max-w-lg text-6xl font-medium leading-[1.08] tracking-[-0.065em] text-[#18231e]">
              Good ideas start with a better conversation.
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-[#718078]">
              One thoughtful space for the AI tools you use every day. Pick up where inspiration takes you.
            </p>
            <div className="mt-14 flex items-center gap-4 border-t border-[#e2e7e3] pt-6">
              <div className="flex -space-x-2">
                <span className="grid size-8 place-items-center rounded-full border-2 border-[#f6f7f5] bg-[#dbe8df] text-[10px] font-semibold text-[#37614c]">G</span>
                <span className="grid size-8 place-items-center rounded-full border-2 border-[#f6f7f5] bg-[#e8dfd3] text-[10px] font-semibold text-[#725637]">C</span>
                <span className="grid size-8 place-items-center rounded-full border-2 border-[#f6f7f5] bg-[#e1e2ed] text-[10px] font-semibold text-[#5b5c82]">A</span>
              </div>
              <p className="text-xs text-[#718078]">Bring your favorite AI models together</p>
            </div>
          </section>

          <section className="mx-auto w-full max-w-[430px]">
            <div className="rounded-[28px] border border-[#e8ece8] bg-white p-7 shadow-[0_24px_70px_-46px_rgba(27,52,39,0.28)] sm:p-10">
              {children}
            </div>
            <p className="mt-6 text-center text-[11px] leading-5 text-[#8a968e]">
              By continuing, you agree to Downbot&apos;s terms and privacy policy.
            </p>
          </section>
        </div>

        <footer className="flex items-center justify-between border-t border-[#e5e9e5] pt-5 text-[11px] text-[#929c95]">
          <span>© 2025 Downbot</span>
          <span>Made for curious minds</span>
        </footer>
      </div>
    </main>
  );
}

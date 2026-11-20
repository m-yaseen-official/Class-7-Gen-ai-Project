import { useState } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth.js";

export function AuthForm({ mode }) {
  const isRegister = mode === "register";
  const { login, register, loading, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError("");
    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData.entries());
    if (isRegister && values.password !== values.confirmPassword) {
      setFormError("Your passwords do not match.");
      return;
    }
    if (isRegister) delete values.confirmPassword;
    if (isRegister) await register(values);
    else await login(values);
  }

  const visibleError = formError || error;
  return (
    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
      {isRegister && (
        <label className="block space-y-2">
          <span className="text-[13px] font-medium text-[#39483f]">Name</span>
          <input
            autoComplete="name"
            className="auth-input"
            maxLength={50}
            minLength={2}
            name="name"
            placeholder="Your name"
            required
          />
        </label>
      )}
      <label className="block space-y-2">
        <span className="text-[13px] font-medium text-[#39483f]">Email address</span>
        <input
          autoComplete="email"
          className="auth-input"
          name="email"
          placeholder="you@example.com"
          required
          type="email"
        />
      </label>
      <label className="block space-y-2">
        <span className="text-[13px] font-medium text-[#39483f]">Password</span>
        <span className="relative block">
          <input
            autoComplete={isRegister ? "new-password" : "current-password"}
            className="auth-input pr-12"
            minLength={isRegister ? 8 : undefined}
            name="password"
            placeholder={isRegister ? "At least 8 characters" : "Enter your password"}
            required
            type={showPassword ? "text" : "password"}
          />
          <button
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 grid w-11 place-items-center text-[#8b978f] transition hover:text-[#42554a]"
            onClick={() => setShowPassword((visible) => !visible)}
            type="button"
          >
            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </span>
      </label>
      {isRegister && (
        <label className="block space-y-2">
          <span className="text-[13px] font-medium text-[#39483f]">Confirm password</span>
          <input
            autoComplete="new-password"
            className="auth-input"
            minLength={8}
            name="confirmPassword"
            placeholder="Enter your password again"
            required
            type={showPassword ? "text" : "password"}
          />
        </label>
      )}
      {visibleError && (
        <p aria-live="polite" className="rounded-xl border border-[#f0d7d4] bg-[#fff8f7] px-3.5 py-3 text-sm text-[#a54c43]">
          {visibleError}
        </p>
      )}
      <button
        className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#285b48] px-5 text-sm font-medium text-white transition hover:bg-[#204c3b] disabled:cursor-not-allowed disabled:opacity-60"
        disabled={loading}
        type="submit"
      >
        {loading ? "Please wait..." : isRegister ? "Create account" : "Sign in"}
        {!loading && <ArrowRight className="transition-transform group-hover:translate-x-0.5" size={16} />}
      </button>
      <p className="pt-1 text-center text-sm text-[#718078]">
        {isRegister ? "Already have an account?" : "New to Downbot?"}{" "}
        <Link
          className="font-semibold text-[#285b48] hover:text-[#204c3b]"
          to={isRegister ? "/login" : "/register"}
        >
          {isRegister ? "Sign in" : "Create an account"}
        </Link>
      </p>
    </form>
  );
}

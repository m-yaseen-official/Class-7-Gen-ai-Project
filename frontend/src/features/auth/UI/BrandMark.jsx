import { Sparkles } from "lucide-react";
import { Link } from "react-router";

export function BrandMark({ compact = false }) {
  return (
    <Link className="inline-flex items-center gap-2.5" to="/">
      <span className="grid size-9 place-items-center rounded-xl bg-[#285b48] text-white">
        <Sparkles size={18} strokeWidth={2.2} />
      </span>
      {!compact && <span className="text-[17px] font-semibold tracking-[-0.04em] text-[#18231e]">downbot</span>}
    </Link>
  );
}
